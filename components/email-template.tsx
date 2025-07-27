import * as React from 'react';

interface ContactEmailTemplateProps {
  name: string;
  email: string;
  company?: string;
  service: string;
  budget?: string;
  timeline?: string;
  message: string;
}

export function ContactEmailTemplate({
  name,
  email,
  company,
  service,
  budget,
  timeline,
  message,
}: ContactEmailTemplateProps) {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto' }}>
      <div style={{ backgroundColor: '#f8f9fa', padding: '40px', borderRadius: '8px' }}>
        <h1 style={{ color: '#333', marginBottom: '30px', fontSize: '24px' }}>
          New Project Inquiry from {name}
        </h1>
        
        <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '8px', marginBottom: '20px' }}>
          <h2 style={{ color: '#333', marginBottom: '20px', fontSize: '18px', borderBottom: '2px solid #eee', paddingBottom: '10px' }}>
            Contact Information
          </h2>
          
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <tr>
              <td style={{ padding: '8px 0', fontWeight: 'bold', color: '#555', width: '120px' }}>Name:</td>
              <td style={{ padding: '8px 0', color: '#333' }}>{name}</td>
            </tr>
            <tr>
              <td style={{ padding: '8px 0', fontWeight: 'bold', color: '#555' }}>Email:</td>
              <td style={{ padding: '8px 0', color: '#333' }}>
                <a href={`mailto:${email}`} style={{ color: '#0066cc', textDecoration: 'none' }}>
                  {email}
                </a>
              </td>
            </tr>
            {company && (
              <tr>
                <td style={{ padding: '8px 0', fontWeight: 'bold', color: '#555' }}>Company:</td>
                <td style={{ padding: '8px 0', color: '#333' }}>{company}</td>
              </tr>
            )}
          </table>
        </div>

        <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '8px', marginBottom: '20px' }}>
          <h2 style={{ color: '#333', marginBottom: '20px', fontSize: '18px', borderBottom: '2px solid #eee', paddingBottom: '10px' }}>
            Project Details
          </h2>
          
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <tr>
              <td style={{ padding: '8px 0', fontWeight: 'bold', color: '#555', width: '120px' }}>Service:</td>
              <td style={{ padding: '8px 0', color: '#333' }}>{service}</td>
            </tr>
            {budget && (
              <tr>
                <td style={{ padding: '8px 0', fontWeight: 'bold', color: '#555' }}>Budget:</td>
                <td style={{ padding: '8px 0', color: '#333' }}>{budget}</td>
              </tr>
            )}
            {timeline && (
              <tr>
                <td style={{ padding: '8px 0', fontWeight: 'bold', color: '#555' }}>Timeline:</td>
                <td style={{ padding: '8px 0', color: '#333' }}>{timeline}</td>
              </tr>
            )}
          </table>
        </div>

        <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '8px' }}>
          <h2 style={{ color: '#333', marginBottom: '20px', fontSize: '18px', borderBottom: '2px solid #eee', paddingBottom: '10px' }}>
            Project Message
          </h2>
          <div style={{ 
            color: '#333', 
            lineHeight: '1.6', 
            backgroundColor: '#f8f9fa', 
            padding: '20px', 
            borderRadius: '8px',
            whiteSpace: 'pre-wrap'
          }}>
            {message}
          </div>
        </div>

        <div style={{ marginTop: '30px', padding: '20px', backgroundColor: '#e3f2fd', borderRadius: '8px', textAlign: 'center' }}>
          <p style={{ margin: '0', color: '#1976d2', fontSize: '14px' }}>
            Reply to this email to respond directly to {name} at {email}
          </p>
        </div>
      </div>
    </div>
  );
}