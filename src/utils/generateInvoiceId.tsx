export const generateInvoiceId = (): string => {
    const randomString = Math.random().toString(36).substr(2, 8); 
    const utcTime = new Date().toISOString().replace(/[-T:.Z]/g, '').slice(0, 14); 
  
    return `${randomString}${utcTime}`; 
  };
  