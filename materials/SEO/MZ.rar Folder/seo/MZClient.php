<?php
/**
 * Created by Wir_Wolf.
 * Author: Andru Cherny
 * E-mail: wir_wolf@bk.ru
 * Date: 23.06.15
 * Time: 10:47
 */
if(isset($_SERVER['HTTP_ORIGIN']))
{
	switch ($_SERVER['HTTP_ORIGIN']) {
		//case 'http://localhost:9000':
		//case 'https://originating-domain.com':
		default:
			header('Access-Control-Allow-Origin: '.$_SERVER['HTTP_ORIGIN']);
			header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
			header('Access-Control-Max-Age: 1000');
			header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With, Content-MD5, X-Alt-Referer');
			header('Access-Control-Allow-Credentials: true');
			break;
	}
}


if($_SERVER['REQUEST_METHOD'] == 'OPTIONS')
{
	die();
}


defined("CURRENT_DIR") or define("CURRENT_DIR", dirname(__FILE__). "/");


defined("CACHE_DIR") or define("CACHE_DIR", CURRENT_DIR."Cache/");

defined("ARTICLE_DIR") or define("ARTICLE_DIR", CACHE_DIR.'Article/');


defined("LOG_DIR") or define("LOG_DIR", CURRENT_DIR.'Log/');

defined("PAGES_DIR") or define("PAGES_DIR", CACHE_DIR . 'Pages/');


defined("ADSTAT_API_URL") or define("ADSTAT_API_URL", "http://adstat3.uct.local/apiMZ");


defined("ADSTAT_API_TOKEN") or define("ADSTAT_API_TOKEN", "123412341234");


require_once('MZAbstract.php');
require_once('Logger/loader.php');

set_error_handler('MZException::catchError', E_ALL);


class MZException extends Exception
{

	public function __construct($message = "", $code = 0, MZException $previous = null)
	{
		header('HTTP/1.1 500 Internal Server Error');
		echo json_encode(array('error' =>$message));
		die(0);
	}

	public static function catchError($errNo, $errStr, $errFile, $errLine)
	{
		header('HTTP/1.1 500 Internal Server Error');
		echo json_encode(array('error' =>$errStr));
		die(0);
	}

}

/**
 * Class MZClient
 */
class MZClient extends MZAbstract
{
	/**
	 *
	 */
	const LOG_FILE = 'MZClient.log';

	/**
	 *
	 */
	const defaultPrefix = 'action';
	/**
	 * @param $className
	 */

	/**
	 * @var stdClass
	 */
	private $input ;

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
			throw new MZException($e->getMessage());
		}


		$this->startRouter(__CLASS__);
	}

	/**
	 * @param $className
	 */
	public function startRouter($className)
	{
		if(!$this->_initialize()) return;
		if(isset($_GET['act']))
		{
			$currentClass = new ReflectionClass($className);
			$name = self::defaultPrefix.ucfirst($_GET['act']);
			if($currentClass->hasMethod($name))
			{
				$this->beforeAction();
				$result = $this->$name();
				$this->afterAction($result);

			}
			else
			{
				header("HTTP/1.0 404 Not Found");
			}
		}
		else
		{
			header('HTTP/1.1 500 Internal Server Error');
		}
		exit;
	}

	/**
	 *
	 */
	protected function beforeAction()
	{
		$jsonStr = file_get_contents('php://input');
		if($json = json_decode($jsonStr))
		{
			$this->input = $json;
		}
		else
		{
			$this->input = new stdClass();
		}
	}

	/**
	 * @param $result
	 */
	protected function afterAction($result)
	{
		if(
			(is_array($result) and isset($result['error']))
		or (is_object($result) and isset($result->error))

		)
		{
			header('HTTP/1.1 500 Internal Server Error');
		}
		echo json_encode($result);
	}


	/**
	 *
	 */
	private function _initialize()
	{
		return $this->selfCheck();

	}


	/**
	 *
	 */
	private function selfCheck()
	{
		$this->selfCheckDirectory();
		$this->selfCheckArticles();
		return true;

	}

	/**
	 *
	 */
	private function selfCheckDirectory()
	{
		$list = array(
			CACHE_DIR,
			ARTICLE_DIR,
			LOG_DIR,
			CURRENT_DIR.self::CONFIG_FILE_NAME,
		);
		foreach($list as $item)
		{
			if(!is_writable($item))
			{
				echo(' Fatal error: Can not writing '.$item);
				die();
			}
		}
	}

	/**
	 *
	 */
	private function selfCheckArticles()
	{
		$list = array(
			CACHE_DIR,
			ARTICLE_DIR,
			LOG_DIR,
			CURRENT_DIR.self::CONFIG_FILE_NAME,
		);
		foreach($list as $item)
		{
			if(!is_writable($item))
			{
				echo(' Fatal error: Can not writing '.$item);
				die();
			}
		}
	}



	/**
	 *
	 */
	private function checkNewVersion()
	{

	}


	/**
	 *
	 */
	public function actionArticlesList()
	{
		return $this->gelAllArticles();
	}

	/**
	 *
	 */
	public function actionArticlesView()
	{

	}

	/**
	 *
	 */
	public function actionArticlesSave()
	{
		if(isset($this->input->url))
		{
			return parent::updateArticleByUrl($this->input->url,$this->input);
		}
		else
		{
			return array('error'=>'Identity');
		}
	}

	/**
	 *
	 */
	public function actionArticlesDelete()
	{
		return $this->deleteArticleByUrl($this->input);
	}

	/**
	 *
	 */
	public function actionArticlesAdd()
	{
		return $this->addArticle($this->input);
	}

	/**
	 *
	 */
	public function actionLogIn()
	{

	}

	/**
	 *
	 */
	public function actionLogOut()
	{

	}


	/**
	 * @return array
	 */
	public function actionGetVersion()
	{
		return array('version' => self::VERSION);
	}


	public function actionSynchronizeArticle()
	{

	}




}


new MZClient();