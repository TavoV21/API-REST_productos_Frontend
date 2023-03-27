import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private URL="http://localhost:4000/api/productos";

  constructor(private HttpClient: HttpClient) { }

    obtenerListaProductos(): Observable<Producto[]>{
     let HttpGetAll= this.HttpClient.get<Producto[]>(`${this.URL}`);
      return HttpGetAll;
    }
    registrarProducto(nombre:string,imagen:File,categoria:string,precio:string,fecha_vencimiento:string): Observable<Object>{
      const formData= new FormData();  
      formData.append('nombre',nombre);
      formData.append('imagen',imagen);
      formData.append('categoria',categoria);
      formData.append('precio',precio);
      formData.append('fecha_vencimiento',fecha_vencimiento);
  
      let HttpPost= this.HttpClient.post(`${this.URL}`,formData);
      return HttpPost;
    }
  
    obtenerProductoById(id:number): Observable<Producto>{    
     let HttpGetById= this.HttpClient.get<Producto>(`${this.URL}/${id}`);
     return HttpGetById;
    }
 
    actualizarProducto(id:number,nombre:string,imagen:File,categoria:string,precio:string,fecha_vencimiento:string): Observable<Object>{    
    const formData2= new FormData();  
    formData2.append('nombre',nombre);
    formData2.append('imagenx',imagen);
    formData2.append('categoria',categoria);
    formData2.append('precio',precio);
    formData2.append('fecha_vencimiento',fecha_vencimiento);

     let HttpPut= this.HttpClient.put(`${this.URL}/${id}`, formData2);
     return HttpPut;
    }
 
    eliminarProducto(id:number): Observable<Object>{    
     let HttpDelete= this.HttpClient.delete(`${this.URL}/${id}`);
     return HttpDelete;
    }
}
