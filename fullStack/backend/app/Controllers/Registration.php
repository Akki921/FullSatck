<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use CodeIgniter\API\ResponseTrait;
use App\Models\RegistrationModel;

class Registration extends ResourceController
{
    /**
     * Return an array of resource objects, themselves in array format
     *
     * @return mixed
     */
    use ResponseTrait;
    public function index()
    {
        $model = new RegistrationModel();
        $data = $model->findAll();
        return $this->respond($data);
    }
    /**
     * Return the properties of a resource object
     *
     * @return mixed
     */
    public function show($id = null)
    {
       
        $model = new RegistrationModel();
        $data = $model->find(['id' => $id]);
        if(!$data) return $this->failNotFound('No Data Found');
        return $this->respond($data[0]);
    }
    

    /**
     * Create a new resource object, from "posted" parameters
     *
     * @return mixed
     */
    public function create()
    {
        helper(['form']);
        $rules = [
            'name'   =>'required',
            'email'  =>'required',
            'address'=>'required',
            'country'=>'required',
            'state'=>'required',
            'city'=>'required',
    
        ];

           
        //    $img=time();
        //    $img3=strval($img);
        //   $img4=".png";
        //    $img1=$this->request->getoriginalName('image');
        //    $img2 = $img3.$img4;
            //print_r($img1);
            $data=[
                'name'=>$this->request->getVar('name'),
                'email'=>$this->request->getVar('email'),
                'address'=>$this->request->getVar('address'),
                'image'=>$this->request->getVar('image'),
                'country'=>$this->request->getVar('country'),
                'state'=>$this->request->getVar('state'),
                'city'=>$this->request->getVar('city'),

                
                

            ];
            
            if(!$this->validate($rules)) return $this->fail($this->validator->getErrors());
            $model= new RegistrationModel();
            $model->save($data);

            $response=[
                'status'=>201,
                'error'=>null,
                'messsage'=>[
                    'sucess'=>'data insserted'
                ]
                ]; 
            return $this->respondCreated($response);
    

    }

   

    /**
     * Add or update a model resource, from "posted" properties
     *
     * @return mixed
     */
    public function update($id = null)
    {
     
        helper(['form']);
        $rules = [
            'name'   =>'required',
            'email'  =>'required',
            'address'=>'required',
            'country'=>'required',
            'state'=>'required',
            'city'=>'required',
    
        ];
            $data=[
                'name'=>$this->request->getVar('name'),
                'email'=>$this->request->getVar('email'),
                'address'=>$this->request->getVar('address'),
                'image'=>$this->request->getVar('image'),
                'country'=>$this->request->getVar('country'),
                'state'=>$this->request->getVar('state'),
                'city'=>$this->request->getVar('city'),
            ];

            if(!$this->validate($rules)) return $this->fail($this->validator->getErrors());
            $model= new RegistrationModel();
            $findById = $model->find(['id' => $id]);
            if(!$findById ) return $this->failNotFound('No Data Found');
            $model->update($id,$data);

            $response=[
                'status'=>201,
                'error'=>null,
                'messsage'=>[
                    'sucess'=>'data insserted'
                ]
                ]; 
            return $this->respondCreated($response);
    

    }


    /**
     * Delete the designated resource object from the model
     *
     * @return mixed
     */
    public function delete($id = null)
    {
        $model= new RegistrationModel();
        $findById = $model->find(['id' => $id]);
        if(!$findById ) return $this->failNotFound('No Data Found');
        $model->delete($id);
        $response=[
            'status'=>200,
            'error'=>null,
            'messsage'=>[
                'sucess'=>'data deleted'
            ]
            ]; 
        return $this->respondCreated($response);
    }
}