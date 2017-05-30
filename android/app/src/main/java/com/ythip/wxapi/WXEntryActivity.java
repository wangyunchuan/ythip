package com.ythip.wxapi;

import android.app.Activity;
import android.os.Bundle;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;

import android.R.integer;
import android.R.string;
import android.app.Activity;
import android.os.Bundle;
import android.os.Handler;
import android.os.Message;
import android.util.Log;
import android.view.KeyEvent;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.view.View.OnClickListener;
import android.view.View.OnKeyListener;
import android.view.WindowManager;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.app.Instrumentation;
import android.widget.Toast;

public class WXEntryActivity extends Activity{

  @Override
  protected void onResume()
  {
   // this.getWindow().setType(WindowManager.LayoutParams.TYPE_KEYGUARD);
    super.onResume();
  }

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    IntentFilter SymhuaDevCheckFilter = new IntentFilter("com.rscja.android.DATA_RESULT");
    registerReceiver(m_c4000BarCodeCheckReciever,SymhuaDevCheckFilter);

  }

  private BroadcastReceiver m_c4000BarCodeCheckReciever = new  BroadcastReceiver () {
    @Override
    public void onReceive(Context context, Intent intent) {
      String intent_data=intent.getStringExtra("data");
      com.ythip.module.SendBroadcastModule.recieverCode = intent_data;
      //Toast.makeText(context, "received:"+intent_data, Toast.LENGTH_SHORT).show();
      finish();
    };
  };
  /*
   @Override
   protected void onDestroy() {
       super.onDestroy();
       unregisterReceiver(m_c4000BarCodeCheckReciever);
   }
   */
}
