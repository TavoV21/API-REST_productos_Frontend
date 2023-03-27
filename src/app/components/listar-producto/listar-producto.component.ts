import { Component, OnInit, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';
import swal from 'sweetalert';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-producto',
  templateUrl: './listar-producto.component.html',
  styleUrls: ['./listar-producto.component.css']
})
export class ListarProductoComponent implements OnInit {

  
  listProductos:Producto[];
  constructor(private productoService:ProductoService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.obtenerProductos();
  }

  imgURL="http://localhost:4000/uploads";

  obtenerProductos(){
        this.productoService.obtenerListaProductos().subscribe(data =>{

          this.listProductos=data;
         console.log(data);

        },error=>{
          console.log(error);          
        }
        );
  }

  eliminarProducto(id:number){
  
    Swal.fire({
      title: '¿Estas seguro?',
      text: "Confirma si deseas eliminar el producto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminalo!',
      cancelButtonText: 'No, cancelar',

    }).then((result) => {
      if(result.value){
        this.productoService.eliminarProducto(id).subscribe(dato => {
          console.log(dato);
          this.obtenerProductos();
          Swal.fire(
            'Producto eliminado',
            'El producto ha sido eliminado con exito',
            'success'
          )
        })
      }
    })
  }
   

}