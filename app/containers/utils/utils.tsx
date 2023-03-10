export function formateoHora(props: any) {
  props = props.split('-');
  return `${props[0]}:00`;
}
export function soloHora(props: any) {
  props = props.split('-');
  props = parseInt(props[0], 10);
  props++;
  return `${props}`;
}
export function formateoHoraConMinutos(props: any) {
  const currentTime = new Date();
  const minutes = currentTime.getMinutes();
  props = props.split('-');
  return `${props[0]}:${minutes}`;
}
export function formateoFecha(props: any) {
  props = props.split('-');
  return `${props[0]}/${props[1]}/${props[2]}`;
}
