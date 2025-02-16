"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Trophy, Timer, Target, Award } from "lucide-react";
import { motion } from "framer-motion";
import SearchBar from "@/layouts/SearchBar";

export default function GamifiedAssessmentDashboard() {
  const studentId = "2021-12345-MN-0";

  const assessments = [
    {
      id: 1,
      title: "Laboratory 1: React Basics",
      date: "2024-02-12",
      score: 85,
      duration: 45,
    },
    {
      id: 2,
      title: "Assessment 2: JavaScript Deep Dive",
      date: "2024-02-10",
      score: 92,
      duration: 38,
      xpEarned: 920,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-100 to-purple-100 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto py-8 space-y-8">
        {/* Search Bar */}
        <SearchBar />

        {/* Student Profile */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg">
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
            <div className="relative">
              <Avatar className="h-20 w-20 sm:h-24 sm:w-24 border-4 border-purple-500 shadow-lg">
                <AvatarFallback className="bg-gradient-to-br from-purple-500 to-blue-500 text-2xl text-white">
                  {studentId.split("-")[3]}
                </AvatarFallback>
              </Avatar>
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
                {studentId}
              </h1>
              <div className="flex justify-center sm:justify-start gap-2 mt-2 items-center">
                <Badge
                  variant="outline"
                  className="text-orange-500 border-orange-500"
                >
                  Student
                </Badge>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
            <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-none">
              <CardContent className="p-4 text-center">
                <Trophy className="w-6 h-6 text-yellow-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-800">92%</div>
                <div className="text-sm text-gray-600">Best Score</div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-green-50 to-blue-50 border-none">
              <CardContent className="p-4 text-center">
                <Target className="w-6 h-6 text-green-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-800">85%</div>
                <div className="text-sm text-gray-600">Avg Score</div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-orange-50 to-yellow-50 border-none">
              <CardContent className="p-4 text-center">
                <Award className="w-6 h-6 text-orange-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-800">6</div>
                <div className="text-sm text-gray-600">Completed</div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Assessment List */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-800 px-2">
            Recent Quests
          </h2>
          {assessments.map((assessment) => (
            <motion.div
              key={assessment.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="bg-white hover:shadow-lg transition-shadow">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center font-bold text-white text-lg shadow-lg shrink-0">
                        #{assessment.id}
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-800">
                          {assessment.title}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Timer className="w-4 h-4" />
                          {assessment.duration} min
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between sm:flex-col items-center sm:text-right w-full sm:w-auto">
                      <div className="text-2xl font-bold text-purple-600">
                        8/10
                      </div>
                      <div className="text-sm text-muted-foreground">
                        <Badge variant="outline">{assessment.score}%</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
