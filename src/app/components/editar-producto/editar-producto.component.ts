import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-producto',
  templateUrl: './editar-producto.component.html',
  styleUrls: ['./editar-producto.component.css']
})
export class EditarProductoComponent implements OnInit {
  id:number;
  file: File;
  imgSelect:string | ArrayBuffer;
  productoNuevo:Producto;
  nuevaUrl;
 
  
  constructor(private productoService:ProductoService,private form:FormBuilder, private router:Router,
    private actRouter: ActivatedRoute) { }

  ngOnInit(): void {
    this.productoNuevo = new Producto();
    this.id=this.actRouter.snapshot.params['id'];
    console.log(this.id);
    this.esEditar(this.id);
  }

  imgURL="http://localhost:4000/uploads";

  capturarFile(e:any){

    if (e.target.files && e.target.files[0]) {
      this.file= <File>e.target.files[0];      
      const reader = new FileReader();
      reader.onload = e => this.imgSelect = reader.result;
      reader.readAsDataURL(this.file);
      console.log(this.file.name);
    }
  
  }

  esEditar(id:number){
    this.productoService.obtenerProductoById(id).subscribe(data=>{
    this.productoNuevo = data;
    console.log(this.productoNuevo);
   
    this.nuevaUrl= this.imgURL+'/'+this.productoNuevo.imagen;     
    });


}

actualizarProducto(){
   this.productoService.actualizarProducto(this.id,this.productoNuevo.nombre,this.file,this.productoNuevo.categoria,this.productoNuevo.precio.toString(),this.productoNuevo.fecha_vencimiento).subscribe(date =>{
    console.log(date);
    this.irAlaListaProductos();
   },error => console.log(error));

}


irAlaListaProductos(){
  this.router.navigate(['/']);
  Swal.fire('Producto actualizado',`El producto ha sido actualizado con exito`,`success`);
}

}
