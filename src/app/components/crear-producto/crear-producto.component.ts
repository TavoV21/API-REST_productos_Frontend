import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';
import swal from 'sweetalert';


@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css']
})
export class CrearProductoComponent implements OnInit {
  productoForm: FormGroup;
  file: File;
  imgSelect:string | ArrayBuffer;

  constructor(private productoService:ProductoService,private form:FormBuilder, private router:Router){}

  ngOnInit(): void {
 
  }

  url="./assets/caja.png";

  capturarFile(e:any){

    if (e.target.files && e.target.files[0]) {
      this.file= <File>e.target.files[0];
      const reader = new FileReader();
      reader.onload = e => this.imgSelect = reader.result;
      reader.readAsDataURL(this.file);
      console.log(this.file.name);
      
    }

  }

  guardarProducto(nombre:HTMLInputElement,categoria:HTMLSelectElement,precio:HTMLInputElement,fechav:HTMLDataElement){   
   this.productoService.registrarProducto(nombre.value,this.file,categoria.value,precio.value,fechav.value).subscribe(date=>{
     console.log(date);
      this.irAlistaProductos();
   },error=>{
      console.log(error);
   })
     
  }

  irAlistaProductos(){
    this.router.navigate(['/']);
    swal( "¡ GUARDADO !" , "Producto añadido con exito!" ,"success");

  }


}
