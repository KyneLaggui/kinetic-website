"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Trophy,
  Flame,
  Star,
  Timer,
  Target,
  Search,
  BookOpen,
  CheckCircle,
  Clock,
  XCircle,
  Award,
} from "lucide-react";
import { motion } from "framer-motion";
import Header from "@/layouts/Header";

export default function GamifiedAssessmentDashboard() {
  const studentId = "2021-12345-MN-0";
  const currentLevel = 5;
  const streak = 3;
  const totalXP = 2750;
  const nextLevelXP = 3000;

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
    <div className="min-h-screen bg-gradient-to-b from-indigo-100 to-purple-100">
      <Header />
      <div className="max-w-4xl mx-auto p-6 space-y-8">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="search"
            placeholder="Search Players..."
            className="pl-10 bg-white/80 backdrop-blur-sm"
          />
        </div>

        {/* Student Profile */}
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center gap-6">
            <div className="relative">
              <Avatar className="h-24 w-24 border-4 border-purple-500 shadow-lg">
                <AvatarFallback className="bg-gradient-to-br from-purple-500 to-blue-500 text-2xl text-white">
                  {studentId.split("-")[3]}
                </AvatarFallback>
              </Avatar>
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-800">{studentId}</h1>
              <div className="flex gap-2 mt-2 items-center">
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
          <div className="grid grid-cols-3 gap-4 mt-6">
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
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center font-bold text-white text-lg shadow-lg">
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
                    <div className="text-right">
                      <div className="text-2xl font-bold text-purple-600">
                        {assessment.score}%
                      </div>
                      <div className="text-sm text-muted-foreground text-center">
                        <Badge variant="outline">8/10</Badge>
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
