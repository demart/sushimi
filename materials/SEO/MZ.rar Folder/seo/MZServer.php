<?php
/**
 * Created by Wir_Wolf.
 * Author: Andru Cherny
 * E-mail: wir_wolf@bk.ru
 * Date: 23.06.15
 * Time: 10:48
 */
header('Content-Type: text/html; charset=utf-8');
//error_reporting(E_ALL || E_WARNING);
//ini_set('display_errors','On');

error_reporting(0);
ini_set('display_errors','Off');

if(isset($_COOKIE["MZ"]) and $_COOKIE["MZ"] === "original")
{
	return false;
}
/**
 *
 */
defined("CURRENT_DIR") or define("CURRENT_DIR", dirname(__FILE__). "/");
/**
 *
 */
defined("CACHE_DIR") or define("CACHE_DIR", CURRENT_DIR."Cache/");
/**
 *
 */
defined("ARTICLE_DIR") or define("ARTICLE_DIR", CACHE_DIR.'Article/');

/**
 *
 */
defined("PAGES_DIR") or define("PAGES_DIR", CACHE_DIR . 'Pages/');

/**
 *
 */
defined("CACHE_TIME") or define("CACHE_TIME", 3600);
/**
 *
 */
defined("LOG_DIR") or define("LOG_DIR", CURRENT_DIR.'Log/');

require_once('MZAbstract.php');
require_once('Logger/loader.php');

/**
 * Class MZServer
 */
class MZServer extends MZAbstract
{

	/**
	 *
	 */
	const CSS_FILE = 'inject.css';
	/**
	 *
	 */
	const JS_FILE = 'inject.js';
	/**
	 *
	 */
	const LOG_FILE = 'MZServer.log';
	/**
	 * @var string
	 */
	public $currentUrl;

	/**
	 *
	 */
	public function __construct()
	{

		try
		{
			parent::__construct();
		}
		catch (Exception $e)
		{
			echo($e->getMessage());
			die();
		}
		if(false!== ($data = $this->getFromCachePage()))
		{
			echo $data;
			die(0);
		}
		else
		{
			$page = $this->getCurrentPage($this->currentUrl);
			$article = $this->getArticle($this->currentUrl);
			if(!$page or !$article)
			{
				$this->getLogger()
					->log('Exit  without MZ !$page or !$article', FileLogger::ERROR);
				return;
			}
			echo $this->insertArticleIntoPage($page, $article, $this->currentUrl);
			die(0); //Exit without code 0
		}
	}
}
new MZServer();