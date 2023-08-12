import weekOfYear from "dayjs/plugin/weekOfYear";
import dayOfYear from "dayjs/plugin/dayOfYear";
import dayjs from "dayjs";

dayjs.extend(weekOfYear);
dayjs.extend(dayOfYear);

export const getMonthlyData = (data: any) => {
  let processedData = [];

  // genrate a sorted list contains 12 months
  const monthsList = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // loop through the monthsList
  for (let i = 0; i < monthsList.length; i++) {
    // get the current month
    const currentMonth = monthsList[i];

    // filter the data by current month
    const filteredData = data.filter((d: any) => {
      return dayjs(d.created_at).format("MMM") === currentMonth;
    });

    // get the total cost of the current month
    const totalCost = filteredData.reduce((acc: any, curr: any) => {
      return acc + curr.cost;
    }, 0);

    // push the data to the processedData
    processedData.push({
      created_at: currentMonth,
      cost: totalCost,
    });
  }

  return processedData;
};

// get weekly data for the past 10 weeks
export const getWeeklyData = (data: any) => {
  let processedData = [];

  // get the current week
  const currentWeek = dayjs().week();

  // get the last 10 weeks
  const last10Weeks = [];
  for (let i = 0; i < 10; i++) {
    last10Weeks.push(currentWeek - i);
  }

  // loop through the last10Weeks
  for (let i = 0; i < last10Weeks.length; i++) {
    // get the current week
    const currentWeek = last10Weeks[i];

    // filter the data by current week
    const filteredData = data.filter((d: any) => {
      return dayjs(d.created_at).week() === currentWeek;
    });

    // get the total cost of the current week
    const totalCost = filteredData.reduce((acc: any, curr: any) => {
      return acc + curr.cost;
    }, 0);

    processedData.push({
      created_at: dayjs().week(currentWeek).format("DD MMM"),
      cost: totalCost,
    });
  }

  return processedData;
};

export const getDailyData = (data: any) => {
  let processedData = [];

  // get the current day
  const currentDay = dayjs().dayOfYear();

  // get the last 10 days
  const last10Days = [];
  for (let i = 0; i < 10; i++) {
    last10Days.push(currentDay - i);
  }

  // loop through the last10Days
  for (let i = 0; i < last10Days.length; i++) {
    // get the current day
    const currentDay = last10Days[i];

    // filter the data by current day
    const filteredData = data.filter((d: any) => {
      return dayjs(d.created_at).dayOfYear() === currentDay;
    });

    // get the total cost of the current day
    const totalCost = filteredData.reduce((acc: any, curr: any) => {
      return acc + curr.cost;
    }, 0);

    processedData.push({
      created_at: dayjs().dayOfYear(currentDay).format("DD MMM"),
      cost: totalCost,
    });
  }

  return processedData;
};

export const getHourlyData = (data: any) => {
  let processedData = [];

  // get the current hour
  const currentHour = dayjs().hour();

  // get the last 10 hours
  const last10Hours = [];
  for (let i = 0; i < 10; i++) {
    last10Hours.push(currentHour - i);
  }

  // loop through the last10Hours
  for (let i = 0; i < last10Hours.length; i++) {
    // get the current hour
    const currentHour = last10Hours[i];

    // filter the data by current hour
    const filteredData = data.filter((d: any) => {
      return dayjs(d.created_at).hour() === currentHour;
    });

    // get the total cost of the current hour
    const totalCost = filteredData.reduce((acc: any, curr: any) => {
      return acc + curr.cost;
    }, 0);

    processedData.push({
      created_at: dayjs().hour(currentHour).format("HH:mm"),
      cost: totalCost,
    });
  }

  return processedData;
};
