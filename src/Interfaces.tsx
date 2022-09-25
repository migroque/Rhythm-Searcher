import React,{Component} from "react";

export const TimeSigtoNum=new Map();
TimeSigtoNum.set("4/4",4);
TimeSigtoNum.set("6/8",3);
TimeSigtoNum.set("3/4",3);
TimeSigtoNum.set("5/4",5);

export const SubdivtoNum=new Map();
SubdivtoNum.set("Eighths",2);
SubdivtoNum.set("16ths",4);
SubdivtoNum.set("quint",5);
SubdivtoNum.set("eighth trips",3);
SubdivtoNum.set("16th trips",6);



