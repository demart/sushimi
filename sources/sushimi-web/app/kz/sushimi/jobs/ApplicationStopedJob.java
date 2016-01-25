package kz.sushimi.jobs;

import kz.sushimi.services.push.APNSManager;
import play.jobs.Job;
import play.jobs.OnApplicationStop;


@OnApplicationStop
public class ApplicationStopedJob extends Job {

	@Override
	public void doJob() throws Exception {
		super.doJob();
		System.out.println("ApplicationConfigurationPlugin onApplicationStop");
		APNSManager.getInstance().stopService();
	}
	
}
