export default function calcTime(offset) {
  // create Date object for current location
  let d = new Date();

  // convert to msec
  // subtract local time zone offset
  // get UTC time in msec
  let utc = d.getTime() + d.getTimezoneOffset() * 60000;

  // create new Date object for different city
  // using supplied offset
  let nd = new Date(utc + 3600000 * offset);

  // return time as a string
  return nd.toISOString();
}
