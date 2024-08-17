export default function fetchDataFilter(path, params, page) {
    return new Promise((resolve, reject) => {
      try {
        const queryParams = new URLSearchParams(window.location.search);
  
        Object.entries(params).forEach(([key, value]) => {
          if (value !== '') {
            const encodedValue = encodeURIComponent(decodeURIComponent(value));
            queryParams.set(key, encodedValue);
          } else {
            queryParams.delete(key);
          }
        });
  
        queryParams.set('page', page);
  
        const newUrl = `${window.location.pathname}?${queryParams.toString()}`;
        window.history.replaceState({}, '', newUrl);
  
        const queryString = queryParams.toString();
  
        fetch(`${process.env.NEXT_PUBLIC_API_ROUTE}${path}?${queryString.replaceAll('%252C', ',').replaceAll('25', '')}`, {
          next: { revalidate: 10 },
          headers: {
            'app-authorization': `${process.env.NEXT_PUBLIC_API_TOKEN}`,
            'Content-Type': 'application/json',
          },
        })
          .then((res) => {
            if (!res.ok) {
              throw new Error(`Erro ao buscar dados: ${res.status}`);
            }
            return res.json();
          })
          .then((data) => {
            resolve(data);
          })
          .catch((error) => {
            console.error(error);
            reject(error);
          });
      } catch (error) {
        console.error(error);
        reject(error);
      }
    });
  }