import { useHistory } from 'react-router';

interface History {
  push(route: string): typeof useHistory;
}

type Timer = number;

export function IdleTimer(history: History, fiveMinutes: Timer) {
  // setting time to a type of any because i dont have time to set the correct typing at the moment
  let time: any = null;
  window.onload = resetTimer;
  document.onmousemove = resetTimer;
  document.onkeydown = resetTimer;
  document.onkeyup = resetTimer;
  document.onclick = resetTimer;

  function logout(): void {
    sessionStorage.clear();
    localStorage.clear();
    history.push('/landing');
  }
  function resetTimer(): void {
    clearTimeout(time);
    time = setTimeout(() => logout(), fiveMinutes);
  }
}
