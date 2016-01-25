<?php


/**
 * Class CompatibilityException
 */
class CompatibilityException extends Exception
{
}

/**
 * Compatibility class
 * For non-supported environments.
 */
class Compatibility
{

	/**
	 *
	 */
	const MIN_PHP_VERSION = '5.3';

	/**
	 * @throws CompatibilityException
	 */
	public static function check()
	{
		self::checkPHPVersion();
	}

	/**
	 * @throws CompatibilityException
	 */
	protected static function checkPHPVersion()
	{
		if(!version_compare(PHP_VERSION, self::MIN_PHP_VERSION, '>='))
		{
			throw new CompatibilityException('PHP version must be greater than ' . self::MIN_PHP_VERSION . '.');
		}
	}

}
