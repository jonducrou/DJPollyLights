intersection()
{
translate([0,-3.175,12.7])linear_extrude(file = "base.dxf", height = 3, center = false,convexity=10);
lsi();
translate([0,308,0])lsi();
translate([0,-3.175,0])ssi();
translate([612.775,-3.175,0])ssi();
for (i = [0:10]){
  translate([51.3+ i*51.05,-3.175,15.9])sst();
}
for (i = [0:4]){
  translate([0,51.3+ i*51.3,15.9])lst();
}
}





module lst()rotate([90,0,0])color([0,0,1])linear_extrude(file = "long-strut.dxf", height = 3, center = false);

module lsi()rotate([90,0,0])color([1,0,1])linear_extrude(file = "long-side.dxf", height = 3, center = false);

module sst()rotate([90,0,90])color([0,1,1])linear_extrude(file = "short-strut.dxf", height = 3, center = false);

module ssi()rotate([90,0,90])color([0,1,0])linear_extrude(file = "short-side.dxf", height = 3, center = false);
