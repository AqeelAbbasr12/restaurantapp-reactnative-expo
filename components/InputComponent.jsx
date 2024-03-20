import React, { useState } from "react";
import { View } from "react-native";
import { TextInput, HelperText } from "react-native-paper";
import { useResponsiveScreen } from "@/hooks/useResponsiveScreen";

export const InputComponent = ({
  mode,
  label,
  value,
  placeholder,
  onChangeText,
  error,
  helperText,
  secureTextEntry,
  style,
  iconStyle,
  placeholderTextColor = "black",
  keyboardType,
}) => {
  const { w, h } = useResponsiveScreen();
  const [secureText, setSecureText] = useState(secureTextEntry);

  const toggleSecureEntry = () => {
    setSecureText(!secureText);
  };
  return (
    <View style={{ marginTop: h(2) }}>
      <TextInput
        mode={mode}
        label={label}
        value={value}
        placeholder={placeholder}
        onChangeText={onChangeText}
        secureTextEntry={secureText}
        placeholderTextColor={placeholderTextColor}
        textColor="black"
        style={style}
        keyboardType={keyboardType}
        outlineColor="gray"
        right={
          secureTextEntry ? (
            <TextInput.Icon
              icon={secureText ? "eye" : "eye-off"}
              color="#f7901e"
              onPress={toggleSecureEntry}
              style={iconStyle}
            />
          ) : keyboardType === "numeric" ? (
            <TextInput.Icon icon="keyboard" color="#d8d8d8" style={iconStyle} />
          ) : null
        }
      />
      {error && <HelperText type="error">{helperText}</HelperText>}
    </View>
  );
};
