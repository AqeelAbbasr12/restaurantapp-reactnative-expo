import { useResponsiveScreen } from "@/hooks/useResponsiveScreen";
import { Text, View, Image, TouchableOpacity, Animated } from "react-native";
import { customTheme } from "@/utils/theme";
import DaiyDeliLogo from "../assets/images/daily-deli.png";
import { useSelector, useDispatch } from "react-redux";
import { setDrawer } from "@/store/drawer/drawerSlice";
import React, { useState, useEffect } from "react";

export const Drawer = () => {
  const [drawerPosition] = useState(new Animated.Value(0));
  const [overlayOpacity] = useState(new Animated.Value(0));
  const { w, h } = useResponsiveScreen();
  const drawer = useSelector((state) => state.drawer.value);
  const dispatch = useDispatch();

  useEffect(() => {
    animateDrawer(drawer); // Start animation when component mounts
  }, []);

  useEffect(() => {
    animateDrawer(drawer); // Start animation when drawer state changes
  }, [drawer]);

  const animateDrawer = (isOpen) => {
    Animated.parallel([
      Animated.timing(drawerPosition, {
        toValue: isOpen ? 1 : 0,
        duration: 500,
        useNativeDriver: false,
      }),
      Animated.timing(overlayOpacity, {
        toValue: isOpen ? 1 : 0,
        duration: 500,
        useNativeDriver: false,
      }),
    ]).start();
  };

  const drawerTranslateX = drawerPosition.interpolate({
    inputRange: [0, 1],
    outputRange: [-w(85), 0],
  });

  return (
    <View
      style={{
        flex: 1,
        width: w(100),
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 100,
        overflow: "hidden",
      }}
    >
      <Animated.View
        style={{
          transform: [{ translateX: drawerTranslateX }],
          flexDirection: "row",
        }}
      >
        <View
          style={{
            backgroundColor: "white",
            width: w(85),
            height: h(100),
            shadowColor: "#171717",
          }}
        >
          <View
            style={{
              height: h(18),
              backgroundColor: customTheme.colors.primary,
              borderBottomRightRadius: 50,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image style={{ width: 150, height: 130 }} source={DaiyDeliLogo} />
          </View>
        </View>
      </Animated.View>

      {/* Overlay TouchableOpacity */}
      <Animated.View
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          backgroundColor: "rgba(0,0,0,0.6)",
          height: h(100),
          width: w(15),
          opacity: overlayOpacity,
        }}
      >
        <TouchableOpacity
          activeOpacity={1}
          style={{ flex: 1 }}
          onPress={() => {
            dispatch(setDrawer(false)); // Toggle drawer state
          }}
        />
      </Animated.View>
    </View>
  );
};
