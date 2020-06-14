export default async () => {
    (window as any).__env__ = {
      GITHUB_API_URL: 'http://localhost:3000'
    }
  };
  