function formatDate(date){
  return new Date(date).toLocaleDateString("de-DE").replace(/\//g, '-');
}

  
export { formatDate }