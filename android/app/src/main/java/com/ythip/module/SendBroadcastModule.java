package com.ythip.module;

import android.content.Intent;
import android.widget.Toast;
import android.app.Activity;
import android.content.IntentFilter;
import android.content.SharedPreferences;
import android.preference.PreferenceManager;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.BaseActivityEventListener;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.LifecycleEventListener;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.Promise;
import com.facebook.react.modules.core.DeviceEventManagerModule;

/**
 * Created by Administrator on 2017/4/15. implements ActivityEventListener, LifecycleEventListener
 */

public class SendBroadcastModule extends ReactContextBaseJavaModule  {
    private static final int IMAGE_PICKER_REQUEST = 467081;
    private static final String E_ACTIVITY_DOES_NOT_EXIST = "E_ACTIVITY_DOES_NOT_EXIST";
    private static final String E_PICKER_CANCELLED = "E_PICKER_CANCELLED";
    private static final String E_FAILED_TO_SHOW_PICKER = "E_FAILED_TO_SHOW_PICKER";
    private static final String E_NO_IMAGE_DATA_FOUND = "E_NO_IMAGE_DATA_FOUND";
    private static final String ACTION_SOFTSCANTRIGGER = "com.symbol.datawedge.api.ACTION_SOFTSCANTRIGGER";
    private static final String EXTRA_PARAM = "com.symbol.datawedge.api.EXTRA_PARAMETER";
    private static final String DWAPI_START_SCANNING = "START_SCANNING";
    private static final String DWAPI_STOP_SCANNING = "STOP_SCANNING";
    private static final String DWAPI_TOGGLE_SCANNING = "TOGGLE_SCANNING";
    public static String recieverCode = "";
    private Promise mPickerPromise;

    private String TAG = getClass().getSimpleName();
    private String NAME = getClass().getSimpleName();

    private final ActivityEventListener mActivityEventListener = new BaseActivityEventListener() {
        @Override
        public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent intent) {
            if (requestCode == IMAGE_PICKER_REQUEST) {
                if (mPickerPromise != null) {
                    if (resultCode == Activity.RESULT_CANCELED) {
                        //mPickerPromise.reject(E_PICKER_CANCELLED, recieverCode);
                        mPickerPromise.resolve(recieverCode);
                    } else if (resultCode == Activity.RESULT_OK) {
                        String intent_data=intent.getStringExtra("data");

                        if (intent_data == null) {
                            mPickerPromise.reject(E_NO_IMAGE_DATA_FOUND, "没有发现数据");
                        } else {
                            mPickerPromise.resolve(intent_data);
                        }
                    }

                    mPickerPromise = null;
                }
            }
        }
    };

    public SendBroadcastModule(ReactApplicationContext reactContext) {
        super(reactContext);
        reactContext.addActivityEventListener(mActivityEventListener);
       // reactContext.addActivityEventListener(this);
       // reactContext.addLifecycleEventListener(this);
    }

    /**
      * 必须要实现的接口
      * @return  返回模块名，JS层使用这个模块名来引用此模块
    */
   @Override
    public String getName() {
    return "SendBroadcast";
  }

  /**
   * 暴露给JS层的接口函数。一定要使用@ReactMethod标签。
   * @param key   传入的键
   * @param val   传入的值
   */
    @ReactMethod
     public void put(String key, String val){
           SharedPreferences sp = PreferenceManager.getDefaultSharedPreferences(getReactApplicationContext());
            SharedPreferences.Editor editor = sp.edit();
            editor.putString(key, val);
            editor.commit();
    }

  /**
   * 暴露给JS层的接口函数。一定要使用@ReactMethod标签。
   * @param key   传入的键
   * @param def   默认值
   * @param callback  回调函数。JS层使用此回调获取从SharedPreferences中查询到的值。
   *                  需要注意的是：callback的调用与此函数是异步的。也就是此函数执行完毕后，
   *                  JS层可能还未拿到返回值。
   */
    @ReactMethod
    public void getString(String key, String def, Callback callback){
            String name = Thread.currentThread().getName();
            SharedPreferences sp = PreferenceManager.getDefaultSharedPreferences(getReactApplicationContext());
            String val = sp.getString(key, def);
            callback.invoke(val);
            emmit();
  }

  @ReactMethod
  public void sendBroadcast() {
    //发送广播
    Toast.makeText(getReactApplicationContext(), "开始发送...", Toast.LENGTH_SHORT).show();
    Intent intent = new Intent();
    intent.setAction(ACTION_SOFTSCANTRIGGER);
    intent.putExtra(EXTRA_PARAM, DWAPI_TOGGLE_SCANNING);
    getReactApplicationContext().sendBroadcast(intent);
    //Intent intent=new Intent("com.rscja.android.DATA_RESULT");
    //intent.putExtra("data", "hello");
    //getReactApplicationContext().sendBroadcast(intent);
  }

  @ReactMethod
  public void getDataFromIntent(Callback successBack, Callback erroBack) {
    try {
      Activity currentActivity = getCurrentActivity();
      String result = currentActivity.getIntent().getStringExtra("result");//会有对应数据放入
      if (result == null) {
        result = "No Data";
      }
      successBack.invoke(result);
    } catch (Exception e) {
      erroBack.invoke(e.getMessage());
    }
  }

    @ReactMethod
    public void pickData(final Promise promise) {
        Activity currentActivity = getCurrentActivity();

        if (currentActivity == null) {
            promise.reject(E_ACTIVITY_DOES_NOT_EXIST, "Activity doesn't exist");
            return;
        }

        // Store the promise to resolve/reject when picker returns data
        mPickerPromise = promise;

        try {
            //final Intent galleryIntent = new Intent(Intent.ACTION_PICK);
            Class aimActivity = Class.forName("com.ythip.wxapi.WXEntryActivity");
            final Intent galleryIntent = new Intent(currentActivity, aimActivity);
            currentActivity.startActivityForResult(galleryIntent, IMAGE_PICKER_REQUEST);
        } catch (Exception e) {
            mPickerPromise.reject(E_FAILED_TO_SHOW_PICKER, e);
            mPickerPromise = null;
        }
    }

    @ReactMethod
    public void pickZEBRATC75Data(final Promise promise) {
        Activity currentActivity = getCurrentActivity();

        if (currentActivity == null) {
            promise.reject(E_ACTIVITY_DOES_NOT_EXIST, "Activity doesn't exist");
            return;
        }

        // Store the promise to resolve/reject when picker returns data
        mPickerPromise = promise;

        try {
            //final Intent galleryIntent = new Intent(Intent.ACTION_PICK);
            Class aimActivity = Class.forName("com.ythip.wxapi.ZEBRATC75Activity");
            final Intent galleryIntent = new Intent(currentActivity, aimActivity);
            currentActivity.startActivityForResult(galleryIntent, IMAGE_PICKER_REQUEST);
        } catch (Exception e) {
            mPickerPromise.reject(E_FAILED_TO_SHOW_PICKER, e);
            mPickerPromise = null;
        }
    }

  @ReactMethod
  public void startActivityByString(String activityName) {
    try {
      Activity currentActivity = getCurrentActivity();
      if (null != currentActivity) {
        Class aimActivity = Class.forName(activityName);
        Intent intent = new Intent(currentActivity, aimActivity);
        currentActivity.startActivity(intent);
      }
    } catch (Exception e) {
      throw new com.facebook.react.bridge.JSApplicationIllegalArgumentException(
              "Could not open the activity : " + e.getMessage());
    }
  }

  private void emmit(){
      WritableMap param = Arguments.createMap();
      param.putString("key_1", "value_1");
      getReactApplicationContext().getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class);
      //emit("event_name", param);
  }

  @ReactMethod
   public void getInt(String key, int def, Callback callback){
      SharedPreferences sp = PreferenceManager.getDefaultSharedPreferences(getReactApplicationContext());
      int val = sp.getInt(key, def);
      callback.invoke(val);
  }
    public  static void sendEvent(ReactContext reactContext, String eventName, int status)
    {
        System.out.println("reactContext="+reactContext);

        reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName,status);
    }
/*
    @Override
    public void onActivityResult(Activity activity,int requestCode, int resultCode, Intent data) {

    }

    @Override
    public void onNewIntent(Intent intent) {

    }

    @Override
    public void onHostResume() {

    }

    @Override
    public void onHostPause() {

    }

    @Override
    public void onHostDestroy() {

    }
*/
}
