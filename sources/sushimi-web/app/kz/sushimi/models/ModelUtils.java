package kz.sushimi.models;

import java.text.SimpleDateFormat;
import java.util.AbstractMap;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;
import java.util.Map.Entry;

public class ModelUtils {
	
	public static List<Entry<String, String>> getTime(int timeIntervalCount, int startWorkHour, int endWorkHour) {
		Calendar currentTime = Calendar.getInstance();
		int currentHour =  currentTime.get(Calendar.HOUR_OF_DAY);
		int startTime = currentHour + 2 > startWorkHour ? currentHour + 2 : startWorkHour + 1;
		int activePeriod = endWorkHour - startTime;
		int partActivePeriod = activePeriod * 2;
		
/*		System.out.println("currentHour: " + currentHour);
		System.out.println("startTime: " + startTime);
		System.out.println("activePeriod: " + activePeriod);
		System.out.println("partActivePeriod: " + partActivePeriod);
*/		
		List<Entry<String, String>> times = new ArrayList<Entry<String, String>>();
		
		for (int i = 0; i < partActivePeriod; i++) {
			int hour = startTime + (i / 2);
			String minute = i % 2 == 0 ? "00" : "30";
/*			System.out.println("Hour: " + hour + " Time: " + minute);*/
			
			currentTime.set(Calendar.HOUR_OF_DAY, hour);
			currentTime.set(Calendar.MINUTE, Integer.valueOf(minute));
			currentTime.set(Calendar.SECOND, 0);
			times.add(new AbstractMap.SimpleEntry(currentTime.getTimeInMillis(), hour + ":" + minute));
		}
		

		int timePeriondLeft = (timeIntervalCount - activePeriod) > endWorkHour - startWorkHour ? endWorkHour-startWorkHour - 1 : timeIntervalCount - activePeriod;
		int startPeriodTomorrow = startWorkHour + 1;
		int timePeriodLeftPart =  timePeriondLeft * 2;
		currentTime.add(Calendar.DATE, 1);
		
		for (int i = 0; i < timePeriodLeftPart; i++) {
			int hour = startPeriodTomorrow + (i / 2);
			String minute = i % 2 == 0 ? "00" : "30";
/*			System.out.println("Hour: " + hour + " Time: " + minute + " Tomorrow");*/
			
			currentTime.set(Calendar.HOUR_OF_DAY, hour);
			currentTime.set(Calendar.MINUTE, Integer.valueOf(minute));
			times.add(new AbstractMap.SimpleEntry(currentTime.getTimeInMillis(), hour + ":" + minute + " (завтра)"));
		}
		
		return times;
	}
	
}
