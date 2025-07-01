package com.jdai.videoplayer;

import android.os.Bundle;
import org.devio.rn.splashscreen.SplashScreen;
import com.facebook.react.ReactActivity;

public class MainActivity extends ReactActivity {

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    SplashScreen.show(this); // Show splash screen before react-native renders
    super.onCreate(savedInstanceState);
  }

  @Override
  protected String getMainComponentName() {
    return "JDVideoPlayer";
  }
}
