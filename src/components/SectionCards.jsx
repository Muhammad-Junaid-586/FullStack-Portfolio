"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { IconTrendingUp } from "@tabler/icons-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// 👇 category mapping
const categoryMap = {
  All: "All Projects",
  htmlCss: "Html & Css",
  Bootstrap: "Bootstrap",
  Javascript: "Javascript",
  React: "React",
  NextJs: "NextJs",
  FullStack: "FullStack",
  Urraan: "Urraan",
};

export default function SectionCards() {
  const [counts, setCounts] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchProjects = async () => {
    try {
      const { data } = await axios.get("/api/projects");
      
      // Handle different response structures
      const projects = Array.isArray(data) 
        ? data 
        : data?.projects || data?.data || [];

      console.log("Fetched projects:", projects);

      // compute counts
      const countsObj = { All: projects.length };
      Object.keys(categoryMap).forEach((cat) => {
        if (cat !== "All") {
          countsObj[cat] = projects.filter((p) => p.category === cat).length;
        }
      });

      setCounts(countsObj);
    } catch (error) {
      console.error("Error fetching project counts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-4 px-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Object.keys(categoryMap).map((cat) => (
          <Card key={cat} className="@container/card">
            <CardHeader>
              <CardDescription>{categoryMap[cat]}</CardDescription>
              <CardTitle className="text-2xl font-semibold tabular-nums">
                Loading...
              </CardTitle>
            </CardHeader>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 px-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Object.keys(categoryMap).map((cat) => (
        <Card key={cat} className="@container/card">
          {/* ✅ Title + Description must stay inside CardHeader */}
          <CardHeader>
            <CardDescription className={"text-blue-500 font-bold"}>{categoryMap[cat]}</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {counts[cat] ?? 0}
            </CardTitle>
          </CardHeader>

          {/* ✅ Content section */}
          <CardContent>
            <Badge variant="outline" className="flex items-center gap-1 bg-black text-white">
              <IconTrendingUp className="size-4" />
              {counts[cat] ?? 0} Projects
            </Badge>
          </CardContent>

          {/* ✅ Footer section */}
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="line-clamp-1 flex gap-2 font-medium">
              Total {categoryMap[cat]} <IconTrendingUp className="size-4" />
            </div>
            <div className="text-muted-foreground">
              Number of projects in this category
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}