# Cherry

1. yarn install

2. yarn add mobx@4.5.0 (4.x任意版本，5.x会有问题)

3. yarn add mobx-react

4. yarn add babel-preset-mobx (为了支持mobx修饰器)

5. 创建src/store/index.js编写mobx代码

6. yarn add react-navigation@2.17.0（高版本有bug）

7. 创建src/index.js编写页面路由文件

8. 编写src/pages/Login.js页面

9. yarn add react-native-elements@beta

10. yarn add react-native-easy-toast

11. yarn add react-native-splash-screen    &&   react-native link react-native-splash-screen

12. 修改MainActivity.java文件 添加onCreate方法

    `@Override
    protected void onCreate(Bundle savedInstanceState) {
    ​    SplashScreen.show(this, R.style.SplashScreenTheme);
    ​    super.onCreate(savedInstanceState);
    }`

    修改AppDelegate.m 添加

    ```objective-c
    - (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
    {
        // ...other code
    
        [RNSplashScreen show];  // here
        return YES;
    }
    ```

13. 在 res/layout 中创建 launch_screen.xml

    ```java
    <?xml version="1.0" encoding="utf-8"?>
    <LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:background="@drawable/launch_screen"
        android:orientation="vertical">
    
    </LinearLayout>
    ```

14. 在 res/drawable-xhdpi 中添加启动屏png文件

15. 在 res/values/styles.xml 中添加

    `<style name="SplashScreenTheme" parent="SplashScreen_SplashTheme">
    ​    <item name="android:windowIsTranslucent">true</item>
    ​    <item name="android:windowFullscreen">true</item>
    </style>`

16. yarn add react-native-scrollable-tab-view && 删除源文件逗号错误

17. yarn add @appandflow/masonry-list

18. yarn add react-native-vector-icons  && react-native link react-native-vector-icons && 修改 implementation错误，buildtools版本错误

19. 集成自定义图标

    创建react-native-vector-icons/Iconfont.js

    创建react-native-vector-icons/glyphmaps/Iconfont.json

    将Iconfont.ttf放入android/app/src/main/assets/fonts

    使用：

    import Iconfont from 'react-native-vector-icons/Iconfont'

    <Iconfont name='yirenzheng' size={30} color="red"></Iconfont>

20. yarn add react-native-image-crop-picker,根据github集成android配置，ios未配置

21. yarn add react-native-image-zoom-viewer

22. yarn add react-native-fs, react-native link react-native-fs
