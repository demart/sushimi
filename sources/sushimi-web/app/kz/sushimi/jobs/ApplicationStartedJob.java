package kz.sushimi.jobs;

import kz.sushimi.services.push.APNSManager;
import play.jobs.Job;
import play.jobs.OnApplicationStart;

@OnApplicationStart(async=true)
public class ApplicationStartedJob extends Job {

	@Override
	public void doJob() throws Exception {
		super.doJob();
		System.out.println("ApplicationConfigurationPlugin onApplicationStart");
		APNSManager.getInstance().startService();
	}
}
