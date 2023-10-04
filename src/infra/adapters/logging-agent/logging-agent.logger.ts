export class Logger {
  public static log(message: string, logLabel?: LogLabel): void {
    console.log(
      JSON.stringify({ severity: 'INFO', message, labels: logLabel }),
    );
  }

  public static error(message: string, logLabel?: LogLabel): void {
    console.error(
      JSON.stringify({ severity: 'ERROR', message, labels: logLabel }),
    );
  }
}

export interface LogLabel {
  origin: string;
  stack?: string;
  instance?: string;
}
