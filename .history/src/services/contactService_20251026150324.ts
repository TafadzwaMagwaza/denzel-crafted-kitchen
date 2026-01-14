// src/services/contactService.ts
export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  eventType: string;
  eventDate: string;
  guests: string;
  message: string;
}

export const sendContactEmail = async (formData: ContactFormData): Promise<{ success: boolean; message: string }> => {
  try {
    const endpoint = '/.netlify/functions/send-email';
    
    console.log('Sending email to:', endpoint);
    console.log('Form data:', formData);
    
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    console.log('Response status:', response.status);
    console.log('Response headers:', response.headers);
    
    // Get the response text first
    const responseText = await response.text();
    console.log('Response text:', responseText);
    
    // Try to parse it as JSON
    let data;
    try {
      data = JSON.parse(responseText);
    } catch (parseError) {
      console.error('Failed to parse response as JSON:', parseError);
      console.error('Response was:', responseText);
      throw new Error('Server returned an invalid response. Please try again.');
    }

    if (!response.ok) {
      throw new Error(data.error || data.message || 'Failed to send email');
    }

    return {
      success: true,
      message: data.message || 'Email sent successfully'
    };
  } catch (error) {
    console.error('Contact service error:', error);
    
    if (error instanceof Error) {
      throw error;
    }
    
    throw new Error('Failed to send message. Please try again later.');
  }
};