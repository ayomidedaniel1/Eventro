import CustomTopTabBar from "@/components/CustomTopTabBar";
import HeaderComponent from "@/components/HeaderComponent";
import { Tabs } from "expo-router";
import React from "react";
import {
  SafeAreaView
} from "react-native";

export default function TicketsLayout() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#010101", }}>
      <HeaderComponent title="Eventro." />

      <Tabs
        initialRouteName="index"
        screenOptions={{
          headerShown: false,
          tabBarPosition: "top",
        }}
        tabBar={(props) => <CustomTopTabBar {...props} />}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Active tickets",
          }}
        />
        <Tabs.Screen
          name="used-tickets"
          options={{
            title: "Used tickets",
          }}
        />
      </Tabs>
    </SafeAreaView>
  );
}
