export const formatDate = (date) => {
    date = new Date(date);
    let year = date.getFullYear();
    let month = date.getMonth();
    let day = date.getDate();
  
    return `${year} / ${month} / ${day}`;
  };