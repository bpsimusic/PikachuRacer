
//returns t/f
export const pokeballCollision = (x,y,r,b,x2,y2,r2,b2) => {
  return !(r<= (x2+30) || x > (r2-52) || b<=(y2+45) || y>(b2-4));
};

//returns t/f
export const pokeballBoxCollision = (pos, size, pos2, size2) => {
  return pokeballCollision(pos[0], pos[1], pos[0] + size[0], pos[1] + size[1],
                  pos2[0], pos2[1], pos2[0] + size2[0], pos2[1] + size2[1]);
};


export const pidgeyCollision = (x,y,r,b,x2,y2,r2,b2) => {
  return !(r<= (x2+40) || x > (r2-80) || b<=(y2+30) || y>(b2-70));
};

//returns t/f
export const pidgeyBoxCollision = (pos, size, pos2, size2) => {
  return pidgeyCollision(pos[0], pos[1], pos[0] + size[0], pos[1] + size[1],
                  pos2[0], pos2[1], pos2[0] + size2[0], pos2[1] + size2[1]);
};


export const berryCollision = (x,y,r,b,x2,y2,r2,b2) => {
  return !(r<= (x2+20) || x > (r2-15) || b<=(y2+30) || y>(b2-30));
};

//returns t/f
export const berryBoxCollision = (pos, size, pos2, size2) => {
  return berryCollision(pos[0], pos[1], pos[0] + size[0], pos[1] + size[1],
                  pos2[0], pos2[1], pos2[0] + size2[0], pos2[1] + size2[1]);
};
