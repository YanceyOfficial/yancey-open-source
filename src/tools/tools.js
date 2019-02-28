export const formatJSONDate = (jsonDate) => {
  return new Date(+new Date(new Date(jsonDate).toJSON()) + 8 * 3600 * 1000).toISOString()
    .replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '');
};

export const sizeFormat = size => {
  const sizes = size / 1024;
  if(sizes >=1){
    return `${sizes.toFixed(2)} MB`;
  }else{
    return `${size} KB`;
  }
}