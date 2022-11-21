import { NearestFilter, TextureLoader, RepeatWrapping } from "three";

import { tile } from "../images";

const tileTexture = new TextureLoader().load(tile);

tileTexture.magFilter = NearestFilter;
tileTexture.wrapS = RepeatWrapping;
tileTexture.wrapT = RepeatWrapping;

export { tileTexture };
