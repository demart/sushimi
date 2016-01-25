<?php
/**
 * Class MZAbstract
 */
abstract class MZAbstract
{

	/**
	 *
	 */
	const VERSION = '1.3.1';
	/**
	 *
	 */
	const LOG_FILE = 'none.log';

	/**
	 *
	 */
	const CONFIG_FILE_NAME = '/config.json';

	/**
	 *
	 */
	const CACHE_FILE = '_MZCode.json';

	/**
	 *
	 */
	const CACHE_HTML = '_MZCode.html';

	/**
	 * @var stdClass
	 */
	protected $_config = null;

	/**
	 * @var FileLogger
	 */
	private $log;


	/**
	 *
	 */
	public function __construct()
	{
		$this->log = new FileLogger(LOG_DIR . static::LOG_FILE);
	}

	/**
	 * @return FileLogger
	 */
	public function getLogger()
	{
		return $this->log;
	}

	//---------------------------------------------------------------------------------------------
	/**
	 * @param $url
	 * @return stdClass|bool
	 */
	protected function getArticle($url = null)
	{
		if($url == null)
		{
			$url = $this->currentUrl(false);
		}

		$url = $this->mzUrlEncode($url);

		if(file_exists(ARTICLE_DIR . $url . self::CACHE_FILE))
		{
			$result = json_decode(file_get_contents(ARTICLE_DIR . $url . self::CACHE_FILE));

			if($result == null or $result == false)
			{
				$this->log->log('Can not read file:' . ARTICLE_DIR . $url . self::CACHE_FILE, FileLogger::FATAL);
				return false;
			}
			return $result;
		}
		else
		{
			$this->log->log('Article ' . $this->mzUrlDecode($url) . ' not found', FileLogger::FATAL);
			return false;
		}
	}

	/**
	 * @param $url
	 * @param $data
	 * @return array
	 * @throws MZException
	 */
	protected function updateArticleByUrl($url, $data)
	{
		$url = $this->mzUrlEncode($url);
		if(file_exists(ARTICLE_DIR . $url . self::CACHE_FILE))
		{
			if(!is_writable(ARTICLE_DIR . $url . self::CACHE_FILE))
			{
				return array('error' => 'Server error. Can not write article. File is not writable');
			}
			else
			{
				try
				{
					if(file_put_contents(ARTICLE_DIR . $url . self::CACHE_FILE, json_encode($data)))
					{
						$this->deleteCache($url);
						return $data;
					}
					else
					{
						return array('error' => 'Error to write file.');
					}
				}
				catch(MZException $e)
				{
					$this->log->log("MZException " . $e->getCode() . " / " . $e->getMessage(), FileLogger::FATAL);
					return array('error' => "MZException " . $e->getCode() . " / " . $e->getMessage());
				}
			}
		}
		else
		{
			$this->log->log('Article ' . $this->mzUrlDecode($url) . ' not found', FileLogger::FATAL);
			return array('error' => 'Article not found');
		}

	}

	/**
	 * @return array
	 * @throws MZException
	 */
	protected function gelAllArticles()
	{
		$articlesList = array();
		$files = new DirectoryIterator(ARTICLE_DIR);
		/** @var DirectoryIterator $articleItem */
		foreach($files as $articleItem)
		{
			if($articleItem->isDot())
			{
				continue;
			}
			$filename = $articleItem->getFilename();
			$url = str_replace(self::CACHE_FILE, '', $filename);
			$url = $this->mzUrlDecode($url);
			$articleData = json_decode(file_get_contents($articleItem->getRealPath()));
			if(!$articleData)
			{
				$this->getLogger()
					->log('Error to read Article. Url:' . $url, FileLogger::FATAL);
				continue;
			}
			$articleData->url = $url;
			$articlesList[$articleData->id] = $articleData;
		}
		return $articlesList;
	}

	/**
	 * @param $page
	 * @param $article
	 * @param $url
	 * @return string
	 */
	protected function insertArticleIntoPage($page, $article, $url)
	{

		$page = $this->pageReplaceH1AndAddArticleToPage($article, $page);
		$page = $this->pageReplaceTitle($article, $page);
		$page = $this->pageReplaceDescription($article, $page);
		return $this->pageInsertAsset($article, $page, $url);

	}


	/**
	 * @param $data
	 * @return array
	 * @throws MZException
	 */
	protected function addArticle($data)
	{
		if(!isset($data->url))
		{
			return array('error' => 'Identity');
		}

		$url = $this->mzUrlEncode($data->url);
		if(!file_exists(ARTICLE_DIR . $url . self::CACHE_FILE))
		{

			if(!is_writable(ARTICLE_DIR))
			{
				return array('error' => 'Server error. Can not write article. Folder is not writable');
			}
			else
			{

				try
				{
					$config = $this->getConfig();
					if(!isset($config->increment))
					{
						$config->increment = 0;
					}
					$data->id = $config->increment;

					$config->increment++;

					if($this->saveConfig() and file_put_contents(ARTICLE_DIR . $url . self::CACHE_FILE, json_encode($data)))
					{

						return $data;
					}
					else
					{
						return array('error' => 'Error to write file.');
					}
				}
				catch(MZException $e)
				{
					$this->log->log("MZException " . $e->getCode() . " / " . $e->getMessage(), FileLogger::FATAL);
					return array('error' => "MZException " . $e->getCode() . " / " . $e->getMessage());
				}
			}
		}
		else
		{
			$this->log->log('Article ' . $this->mzUrlDecode($url) . ' found', FileLogger::FATAL);
			return array('error' => 'This Article already exist');
		}
	}

	/**
	 * @param $input
	 * @return array
	 * @throws MZException
	 */
	protected function deleteArticleByUrl($input)
	{
		if(!isset($input->url))
		{
			return array('error' => 'Identity');
		}

		$url = $this->mzUrlEncode($input->url);
		if(file_exists(ARTICLE_DIR . $url . self::CACHE_FILE))
		{

			if(!is_writable(ARTICLE_DIR . $url . self::CACHE_FILE))
			{
				return array('error' => 'Server error. Can not delete. Folder is not writable');
			}
			else
			{

				try
				{
					if(unlink(ARTICLE_DIR . $url . self::CACHE_FILE))
					{
						$this->deleteCache($url);
						return array();
					}
					else
					{
						return array('error' => 'Error to delete file.');
					}
				}
				catch(MZException $e)
				{
					$this->log->log("MZException " . $e->getCode() . " / " . $e->getMessage(), FileLogger::FATAL);
					return array('error' => "MZException " . $e->getCode() . " / " . $e->getMessage());
				}

			}
		}
		else
		{
			return array('error' => 'Article not found');
		}
	}


	/**
	 * @throws MZException
	 */
	private function loadConfig()
	{
		if(!file_exists(CURRENT_DIR . self::CONFIG_FILE_NAME))
		{
			throw new MZException('Config file not found! Kernel panic');
		}
		$json = json_decode(file_get_contents(CURRENT_DIR . self::CONFIG_FILE_NAME));
		if(get_class($json) !== 'stdClass')
		{
			throw new MZException('Can not read config! Kernel panic');
		}
		$this->_config = $json;
	}

	/**
	 * @return stdClass
	 * @throws MZException
	 */
	protected function getConfig()
	{
		if(is_null($this->_config))
		{
			$this->loadConfig();
		}
		return $this->_config;
	}

	/**
	 * @return bool
	 * @throws MZException
	 */
	protected function saveConfig()
	{
		if(!is_null($this->_config))
		{
			if(!is_writable(CURRENT_DIR))
			{
				throw new MZException('Server error. Can not write config. Folder is not writable');
			}
			else
			{
				if(!file_put_contents(CURRENT_DIR . self::CONFIG_FILE_NAME, json_encode($this->_config)))
				{
					throw new MZException('Error to write config file.');
				}
				$this->_config = null;

			}
		}
		return true;
	}
	//--------------------------------------------------------------------------------------------

	/**
	 * @param $article
	 * @param string $page
	 * @return string
	 */
	private function pageReplaceH1AndAddArticleToPage($article, $page)
	{
		if(isset($article->name) and isset($article->text) and isset($article->encoding))
		{
			//Move all H1 to p.
			$h1Pattern = '/<h1(.*?)<\/h1>/si';
			if(preg_match($h1Pattern, $page))
			{
				$page = preg_replace($h1Pattern, '<p class="old_h1"$1</p>', $page);
			}

			$page = preg_replace('~<\s*/\s*body\s*>~im', '<a id="articleDisplay" onclick="followText();" >' . iconv("UTF-8", $article->encoding, "more") . ' </a></body>', $page);// md5 mz_cod_work!

			preg_match('|<body([^>]+)?>(.*)</body>|Usi', $page, $matchesBody);

			$body = "<body" . $matchesBody['1'] . ">" . "\r\n";
			$body .= '<!--MZBlock-->';
			$body .= '<div id="seoUctBlock">';
			$body .= '<h1>' . iconv("UTF-8", $article->encoding, $article->name) . '</h1>';
			$body .= "<div id='seoUctForH1Article'>  " . iconv("UTF-8", $article->encoding, $article->text) . "</div>";
			$body .= "</div>";
			$body .= "<!--EndMZBlock Version:" . self::VERSION . "-->";
			$body .= "<!--" . $_SERVER['HTTP_HOST'] . "-->";
			$body .= $matchesBody['2'];

			return str_replace($matchesBody[0], $body, $page);
		}
		else
		{
			return $page;
		}

	}

	/**
	 * @param $article
	 * @param string $page
	 * @return string
	 */
	/**
	 * @param $article
	 * @param string $page
	 * @return string
	 */
	private function pageReplaceTitle($article, $page)
	{
		if(isset($article->title))
		{
			return preg_replace('|<title([^>]+)?>(.*)</title>|Usi', '<title>' . $article->title . '</title>', $page);
		}
		return $page;
	}

	/**
	 * @param $article
	 * @param string $page
	 * @return string
	 */
	private function pageReplaceDescription($article, $page)
	{
		$descriptionPattern = '~<\s*meta\s+.*name\s*=[\'"]\s*description.*?>~im';
		$newDescription = '<meta name="description" content="' . iconv("UTF-8", $article->encoding, $article->description) . '" />';
		if(preg_match($descriptionPattern, $page))
		{
			$page = preg_replace($descriptionPattern, $newDescription, $page);
		}
		else
		{
			$page = preg_replace('~<\s*/\s*head\s*>~im', $newDescription . '</head>', $page);
		}
		return $page;
	}

	/**
	 * @param $article
	 * @param string $page
	 * @return string
	 */
	private function pageInsertAsset($article, $page, $url = null)
	{
		/*if($url == null)
		{
			$url = $this->mzUrlEncode($this->currentUrl());
		}*/

		if(isset($article->css))
		{
			$articleCss = '<style type="text/css">' . $article->css . '</style>' . "\n\r";
		}
		else
		{
			$articleCss = '';
		}
		$css = '<style type="text/css">' . file_get_contents(CURRENT_DIR . static::CSS_FILE) . '</style>' . "\n\r";

		$js = '<script type="text/javascript">' . file_get_contents(CURRENT_DIR . static::JS_FILE) . '</script>' . "\n\r";

		$cache = preg_replace('~<\s*/\s*head\s*>~im', $css . $articleCss . $js . '</head>', $page);

		$this->addToCache(null,$cache);

		return $cache;
	}


	/**
	 * @param null $url
	 * @param $cache
	 * @throws MZException
	 */
	protected function addToCache($url = null,$cache)
	{
		if($url == null)
		{
			$url = $this->mzUrlEncode($this->currentUrl(false));
		}
		FileTransfer::instance(PAGES_DIR  . $url . self::CACHE_HTML)->writeToFile($cache);
	}

	/**
	 * @param $url
	 * @throws MZException
	 */
	public function deleteCache($url)
	{
		if(file_exists(PAGES_DIR  . $url . self::CACHE_HTML))
		{
			if(!@unlink(PAGES_DIR  . $url . self::CACHE_HTML))
			{
				throw new MZException('Article saved. But Cache can-not deleted');
			}
		}

	}

	/**
	 *
	 */
	public function getFromCachePage()
	{
		$url = $this->mzUrlEncode($this->currentUrl(false));
		$fileSrc = PAGES_DIR  . $url . self::CACHE_HTML;
		if(file_exists($fileSrc) and (filemtime($fileSrc) + CACHE_TIME) >= time())
		{
			return file_get_contents($fileSrc);
		}
		else
		{
			return false;
		}
	}

	/**
	 * @param $uri
	 * @return string
	 */
	public function mzUrlEncode($uri)
	{

		$old = array(
			'/',
			'.',
			'&',
			'?',
			'='
		);
		$new = array(
			'mz_str',
			'mz_Dot',
			'mz_nd',
			'mz_gg',
			'mz_rr'
		);

		$uri = str_replace($old, $new, $uri);
		return $uri;
	}

	/**
	 * @param $uri
	 * @return string
	 */
	public function mzUrlDecode($uri)
	{
		$old = array(
			'/',
			'.',
			'&',
			'?',
			'='
		);
		$new = array(
			'mz_str',
			'mz_Dot',
			'mz_nd',
			'mz_gg',
			'mz_rr'
		);

		$uri = str_replace($new, $old, $uri);
		return $uri;
	}

	//------------------------Curl block-----------------------------------------------------
	/**
	 * @var array
	 */
	private static $redirectArray = array();

	/**
	 * @var int
	 */
	private static $curl_loops = 0;

	/**
	 *
	 */
	const CURL_MAX_LOOPS = 20;
	/**
	 *
	 */
	const CURL_TIMEOUT = 3;

	/**
	 * @param null $url
	 * @return bool|mixed
	 * @throws MZException
	 */
	protected function getCurrentPage($url = null)
	{
		if($url == null)
		{
			$url = $this->currentUrl();
		}

		$headers = $this->getCurlMZHeaders();

		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL, $url);
		curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true); // Возвращать результат в переменную (а не выводить)
		curl_setopt($ch, CURLOPT_TIMEOUT, 5); //Максимальное время выполнения CURL
		curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, self::CURL_TIMEOUT); // Таймаут ожидания ответа

		$curlResult = $this->curlRedirectExec($ch);
		$info = curl_getinfo($ch);
		curl_close($ch);
		if($curlResult === false)
		{
			$this->log->log('Error to get current self. URL:' . $url, FileLogger::FATAL);
			return false;
		}
		if($info['http_code'] > 399)
		{
			$this->log->log('Error. Http code:' . $info['http_code'] . ' URL:' . $url, FileLogger::FATAL);
			return false;
		}
		return $curlResult;
	}

	/**
	 * @return array
	 */
	private function getCurlMZHeaders()
	{
		$headers = array();

		if(function_exists('getallheaders'))
		{
			$headers = getallheaders();
			if(isset($headers['Cookie']))
			{
				$headers['Cookie'] = ';';
			}
			else
			{
				$headers['Cookie'] = '';
			}
			$headers['Cookie'] .= ' MZ=original';
		}
		else
		{
			foreach($_SERVER as $name => $value)
			{
				if(substr($name, 0, 5) == 'HTTP_')
				{
					$name = str_replace(' ', '-', ucwords(strtolower(str_replace('_', ' ', substr($name, 5)))));
					$headers[$name] = $value;
					if($name === 'Cookie')
					{
						$headers[$name] .= '; MZ=original';
					}
				}
			}
		}
		$newHeaders = array();
		foreach($headers as $key => $value)
		{
			if($key === 'Accept-Encoding')
			{
				$newHeaders[] = 'Accept-Encoding: identity';
			}
			else
			{
				$newHeaders[] = $key . ': ' . $value;
			}
		}
		$newHeaders[] = 'Accept-Charset: utf-8';
		return $newHeaders;

	}

	/**
	 * @param $ch
	 * @return bool|mixed
	 */
	private function curlRedirectExec($ch)
	{
		if(self::$curl_loops >= self::CURL_MAX_LOOPS)
		{
			self::$curl_loops = 0;
			return false;
		}
		curl_setopt($ch, CURLOPT_HEADER, true);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);


		$curlResult = curl_exec($ch);

		$parts = explode("\r\n\r\nHTTP/", $curlResult);
		$parts = (count($parts) > 1 ? 'HTTP/' : '') . array_pop($parts);
		list($header, $data) = explode("\r\n\r\n", $parts, 2);

		$http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
		if($http_code == 301 or $http_code == 302)
		{
			$matches = array();
			preg_match('/Location:(.*)\n/', $header, $matches);
			$new_url = trim(array_pop($matches));

			if(!$new_url)
			{
				self::$curl_loops = 0;
				return 'Http-code:' . $http_code . ' but redirect_url is not found';
			}

			self::$redirectArray[] = $new_url;
			curl_setopt($ch, CURLOPT_URL, $new_url);
			$this->log->log('Http code: ' . $http_code . ' redirected to ' . $new_url, FileLogger::NOTICE);
			return $this->curlRedirectExec($ch);
		}
		else
		{
			self::$curl_loops = 0;
			return $data;
		}
	}

	/**
	 * @param bool|true $withHttp
	 * @return string
	 */
	private function currentUrl($withHttp = true)
	{
		$url = rawurldecode($_SERVER['REQUEST_URI']);
		if($withHttp)
		{
			$url = 'http://' . $_SERVER['SERVER_NAME'] . $url;
		}
		return $url;
	}


}

/**
 * Class FileTransfer
 */
class FileTransfer
{

	/**
	 * @var array
	 */
	private static $singleton  = array();


	/**
	 * @param $filename
	 * @return FileTransfer
	 */
	public static function instance($filename)
	{
		if(!isset(self::$singleton[$filename]))
		{
			self::$singleton[$filename] = new self($filename);
		}
		return self::$singleton[$filename];
	}


	/**
	 *
	 */
	const PERMISSION_FOLDER = 755;
	/**
	 *
	 */
	const PERMISSION_FILE = 664;

	/**
	 * @var null
	 */
	private $fileHandle = null;

	/**
	 * @param $src
	 * @return bool
	 * @throws Exception
	 * @throws MZException
	 */
	public static function checkIsWritableToFile($src)
	{

		if(!is_dir(dirname($src)))
		{
			if(!mkdir(dirname($src), self::PERMISSION_FOLDER, true))
			{
				throw new MZException('Could not find or create directory for log file.');
			}
		}
		if(!is_writable(dirname($src)))
		{
			if(!chmod(dirname($src),self::PERMISSION_FOLDER))
			{
				throw new MZException($src.' Permission deny !is_writable Log folder');
			}
		}
		if(file_exists($src))
		{
			if(!is_writable($src) or !is_readable($src))
			{
				if(!chmod($src,self::PERMISSION_FILE))
				{
					throw new MZException($src.' Permission deny !is_writable');
				}

			}
		}
		return true;

	}

	/**
	 * @param string $data
	 * @throws MZException
	 */
	public function writeToFile($data)
	{
		if(flock($this->fileHandle, LOCK_EX)) // выполняем эксклюзивную блокировку
		{
			ftruncate($this->fileHandle, 0); // очищаем файл
			fwrite($this->fileHandle, $data);
			fflush($this->fileHandle);        // очищаем вывод перед отменой блокировки
			flock($this->fileHandle, LOCK_UN); // отпираем файл
		}
		else
		{
			throw new MZException('Error to blocked file');
		}
	}


	/**
	 * @param $src
	 * @throws Exception
	 */
	public function __construct($src)
	{
		if(self::checkIsWritableToFile($src))
		{
			if(!$this->fileHandle = fopen($src, 'a+'))
			{
				throw new Exception('Error to foupen file:'.$src);
			}

		}
	}

	/**
	 *
	 */
	public function __destruct()
	{
		if($this->fileHandle !== null)
		{
			fclose($this->fileHandle);
		}
		unset($this->fileHandle);
	}

	/**
	 * @return null|resource
	 */
	public function getFileHandle()
	{
		return $this->fileHandle;
	}
}