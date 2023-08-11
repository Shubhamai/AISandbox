"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import dayjs from "dayjs";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/app/components/ui/select";

const Usage = () => {
  const [data, setData] = useState<any[] | undefined>(undefined);
  // const [rangeSelected, setRangeSelected] = useState<string>("Monthly");

  const supabase = createClientComponentClient();

  useEffect(() => {
    const getData = async () => {
      let { data, error } = await supabase
        .from("apiusage")
        .select("created_at,cost");

      if (error) {
        console.log(error);
      }
      if (data) {
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

        console.log(monthsList);

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

        console.log(processedData);

        setData(processedData);
      }
    };

    getData();
  }, []); //[rangeSelected]);

  return (
    <div className="p-10 flex flex-col gap-10 ">
      <div className="flex flex-col gap-3 ml-5 w-[800px]">
        <h1 className="text-3xl font-bold">Usage</h1>
        <h4 className="text-foreground/50 text-sm">
          Below is the statistics of your usage of the AISandbox REST API.
        </h4>
        {/* TODO : Select Stuff and data table */}
        {/* <Select
          defaultValue="Monthly"
          onValueChange={(value) => {
            setRangeSelected(value);
          }}
        >
          <SelectTrigger className="w-40 ml-auto">
            <SelectValue>Monthly</SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Monthly">Monthly</SelectItem>
            <SelectItem value="Weekly">Weekly</SelectItem>
            <SelectItem value="Daily">Daily</SelectItem>
          </SelectContent>
        </Select> */}
      </div>
      <div className="w-[800px]">
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={data}>
            <XAxis
              dataKey="created_at"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `$${value}`}
            />
            <Bar dataKey="cost" fill="#333333" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Usage;
