package com.ythip;

import android.app.Application;

import com.facebook.react.ReactApplication;
import cn.reactnative.modules.jpush.JPushPackage;
import com.pusherman.networkinfo.RNNetworkInfoPackage;
import com.github.xinthink.rnmk.ReactMaterialKitPackage;
import com.imagepicker.ImagePickerPackage;
import com.rnfs.RNFSPackage;
import com.chymtt.reactnativedropdown.DropdownPackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.eguma.vibration.Vibration;
import com.oblador.vectoricons.VectorIconsPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.ythip.module.SendBroadcastPackage;
import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
            new MainReactPackage(),
            new JPushPackage(),
            new RNNetworkInfoPackage(),
            new ReactMaterialKitPackage(),
            new ImagePickerPackage(),
            new RNFSPackage(),
            new DropdownPackage(),
            new RNDeviceInfo(),
            new Vibration(),
            new SendBroadcastPackage(),//注册广播模块
            new VectorIconsPackage()
      );
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
