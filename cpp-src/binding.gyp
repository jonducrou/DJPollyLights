{
  "targets": [
    {
      "target_name": "ledcontrol",
      "sources": [ "led-control.cpp", "include/gpio-driver.cpp", 
"include/spi-driver.cpp", "include/ws2801-driver.cpp" ],
    },
    {
      "target_name": "spectrum",
      "sources": [ "i2c_spectrum.cc" ],
      "include_dirs": [
        "/usr/include/glib-2.0",
        "/usr/lib/glib-2.0/include",
        "/usr/include/gtk-2.0",
        "/usr/lib/gtk-2.0/include",
        "/usr/include/atk-1.0",
        "/usr/include/cairo",
        "/usr/include/gdk-pixbuf-2.0",
        "/usr/include/pango-1.0",
        "/usr/include/pixman-1",
        "/usr/include/freetype2",
        "/usr/include/libpng12",
      ],
    }
  ]
}
