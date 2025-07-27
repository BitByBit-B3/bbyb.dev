import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { ContactEmailTemplate } from '@/components/email-template';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, company, service, budget, timeline, message } = body;

    console.log('Received form data:', { name, email, company, service, budget, timeline, message });

    // Basic validation
    if (!name || !email || !message || !service) {
      console.log('Missing required fields:', { name: !!name, email: !!email, message: !!message, service: !!service });
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if API key is configured
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY not configured');
      return NextResponse.json(
        { error: 'Email service not configured' },
        { status: 500 }
      );
    }

    // Send email
    const { data, error } = await resend.emails.send({
      from: 'BitByBit B3 <onboarding@resend.dev>',
      to: ['bitbybit0123@gmail.com'], // Use verified email for testing mode
      subject: `New Project Inquiry from ${name}`,
      react: ContactEmailTemplate({
        name,
        email,
        company,
        service,
        budget,
        timeline,
        message,
      }),
      replyTo: email,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: 'Failed to send email', details: error },
        { status: 500 }
      );
    }

    console.log('Email sent successfully:', data);
    return NextResponse.json(
      { message: 'Email sent successfully', id: data?.id },
      { status: 200 }
    );
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}