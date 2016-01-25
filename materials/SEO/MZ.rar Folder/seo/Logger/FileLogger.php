<?php

/**
 * Class FileLoggerException
 */
class FileLoggerException extends Exception
{
	/*public function __construct($message = "", $code = 0, Exception $previous = null)
	{
		header('HTTP/1.1 500 Internal Server Error');
		echo json_encode(array('error'=>$message));
	}*/
}

/**
 * File logger
 * Log notices, warnings, errors or fatal errors into a log file.
 * @author gehaxelt
 */
class FileLogger
{

	/**
	 * Holds the file handle.
	 * @var resource
	 */
	protected $fileName = null;

	/**
	 * The time format to show in the log.
	 * @var string
	 */
	protected $timeFormat = 'd.m.Y - H:i:s';

	/**
	 * The file permissions.
	 */

	/**
	 *
	 */
	const NOTICE = '[NOTICE]';
	/**
	 *
	 */
	const WARNING = '[WARNING]';
	/**
	 *
	 */
	const ERROR = '[ERROR]';
	/**
	 *
	 */
	const FATAL = '[FATAL]';


	/**
	 * Opens the file handle.
	 * @param string $logfile The path to the loggable file.
	 */
	public function __construct($logfile)
	{
		$this->fileName = $logfile;
		FileTransfer::instance($logfile);
	}

	/**
	 * Logs the message into the log file.
	 * @param  string $message        The log message.
	 * @param int|string $messageType Optional: urgency of the message.
	 * @throws FileLoggerException
	 */
	public function log($message, $messageType = FileLogger::WARNING)
	{
		if(!is_string($message))
		{
			throw new FileLoggerException('$message is not a string');
		}

		if($messageType != FileLogger::NOTICE && $messageType != FileLogger::WARNING && $messageType != FileLogger::ERROR && $messageType != FileLogger::FATAL
		)
		{
			throw new FileLoggerException('Wrong $messageType given.');
		}

		$this->writeToLogFile("[" . $this->getTime() . "]" . $messageType . " - " . $message);
	}

	/**
	 * Writes content to the log file.
	 * @param string $message
	 */
	private function writeToLogFile($message)
	{
		FileTransfer::instance($this->fileName)->writeToFile($message);
	}

	/**
	 * Returns the current timestamp.
	 * @return string with the current date
	 */
	private function getTime()
	{
		return date($this->timeFormat);
	}
}
