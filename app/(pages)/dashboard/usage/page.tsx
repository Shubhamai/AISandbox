"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import dayjs from "dayjs";
import { DataTableDemo } from "./data-table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import {
  getDailyData,
  getHourlyData,
  getMonthlyData,
  getWeeklyData,
} from "@/app/components/dashboard/usageUtils";

const Usage = () => {
  const [data, setData] = useState<any[] | undefined>(undefined); // [
  const [processedData, setProcessedData] = useState<any[] | undefined>(
    undefined
  );
  const [rangeSelected, setRangeSelected] = useState<string>("Monthly");

  const supabase = createClientComponentClient();

  useEffect(() => {
    const getData = async () => {
      let { data: supabaseData, error } = await supabase
        .from("apiusage")
        .select("created_at,project_id,cost,execution_time,source,description");

      if (error) {
        console.log(error);
      }
      if (supabaseData && !data) {
        // sort the supabaseData by created_at at descending order

        supabaseData = supabaseData.sort((a: any, b: any) => {
          return dayjs(b.created_at).unix() - dayjs(a.created_at).unix();
        });

        setData(supabaseData);

        setProcessedData(getMonthlyData(supabaseData));
      }
    };

    getData();

    if (data) {
      if (rangeSelected === "Monthly") {
        setProcessedData(getMonthlyData(data));
      } else if (rangeSelected === "Weekly") {
        setProcessedData(getWeeklyData(data));
      } else if (rangeSelected === "Daily") {
        setProcessedData(getDailyData(data));
      } else if (rangeSelected === "Hourly") {
        setProcessedData(getHourlyData(data));
      }
    }
  }, [rangeSelected]);

  return (
    <div className="p-10 flex flex-col gap-10 ">
      <div className="flex flex-col gap-3 w-[800px]">
        <h1 className="text-3xl font-bold">Usage</h1>
        <h4 className="text-foreground/50 text-sm">
          Below is the statistics of your usage of the AISandbox REST API.
        </h4>
        {/* TODO : Select Stuff and data table */}
        <Select
          onValueChange={(value) => {
            setRangeSelected(value);
          }}
        >
          <SelectTrigger className="w-40 ml-auto">
            <SelectValue>{rangeSelected}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Monthly">Monthly</SelectItem>
            <SelectItem value="Weekly">Weekly</SelectItem>
            <SelectItem value="Daily">Daily</SelectItem>
            <SelectItem value="Hourly">Hourly</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col gap-16 w-[800px]">
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={processedData}>
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
        <div className="ml-5">
          {data ? <DataTableDemo data={data} /> : <div>Loading...</div>}
        </div>
      </div>
    </div>
  );
};

export default Usage;
