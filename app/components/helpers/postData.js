export default async function postData(path, data, formData = false) {
    try {
      const headers = {
        'app-authorization': `${process.env.NEXT_PUBLIC_API_TOKEN}`,
      };
  
      let body;
      if (formData) {
        body = data;
      } else {
        headers['Content-Type'] = 'application/json';
        body = JSON.stringify(data);
      }
  
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_ROUTE}${path}`, {
        method: 'POST',
        headers,
        body,
      });
  
      if (!res.ok) {
          const errorResponse = await res.json();
          throw errorResponse;
        }
  
      return res.json();
    } catch (error) {
      throw error;
    }
  }