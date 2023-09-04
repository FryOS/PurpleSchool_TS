function swapKeysAndValues<T>(obj: T): { [key: string]: string } {
    const swappedObj: { [key: string]: string } = {};
    Object.entries(obj).forEach(([key, value]) => {
      if (typeof value === 'string') {
        swappedObj[value] = key;
      }
    });
    return swappedObj;
  }

  const obj = {
    name: 'John',
    age: 25,
    location: 'New York'
  };
  
  const swappedObj = swapKeysAndValues(obj);
  console.log(swappedObj);