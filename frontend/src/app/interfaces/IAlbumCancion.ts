export interface IAlbumCancion {
  idCancionAlbum: number,
  idCancion: number;
  titulo: string;
  genero: string;
  fechaLanzamiento: Date;
  linkReferencia: string;
  autor: string;
  vecesReproducidas: number;
  imagen: string;
  idUsuario: number;
}
