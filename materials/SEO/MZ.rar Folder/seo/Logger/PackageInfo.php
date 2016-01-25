<?php


/**
 * Package info
 * About this package.
 */
class PackageInfo
{

	/**
	 * @var array
	 */
	protected static $packageInfo = array(
		'version' => 1.2,

		'authors' => array(
			'gehaxelt' => array(
				'github' => 'https://github.com/gehaxelt/',
				'email'  => 'github@gehaxelt.in',
				'site'   => 'http://www.gehaxelt.in'
			),

			'pedzed'   => array(
				'github' => 'https://github.com/pedzed/'
			)
		)
	);

	/**
	 * @return array
	 */
	public static function getInfo()
	{
		return self::$packageInfo;
	}

}

