<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use App\Traits\PushLog;
use App\Models\File;
// use App\Models\DynamicInput;
use App\Models\UserGroup;
use App\Models\Option;
use App\Models\Keyword;
use DB;

class FileManagerController extends Controller
{
    use PushLog;
    private $readable_name    = 'Kelola Berkas'; 
    private $default_folder = 'file-manager/';
    private $file_indexes = array('file_main');
    
    public function index()
    {
      $data['keywords'] = Keyword::orderBy('subject','asc')->get();
      $data['is_deletable'] = $this->findBySlug($this->findBySlug(session('role_permission'), 'slug','/files')['permit'], 'name','delete'); 
      return view('pages.file-manager.index',$data);
    }
    public function form_add()
    {
      $data['user_groups'] = UserGroup::orderBy('id','desc')->get();
      $data['keywords'] = Keyword::orderBy('subject','asc')->get();
      $data['editorial_permissions'] = Option::where('type','EDITORIAL_PERMISSION')->get();
      $data['file_types'] = Option::where('type','TYPE_OF_FILE')->get();
      $data['publicity_types'] = Option::where('type','TYPE_OF_PUBLICITY')->get();
      return view('pages.file-manager.add',$data);
    }
    public function form_edit($id)
    {
      // $request = new Request;
      // $dynamic_inputs = json_decode(app('App\Http\Controllers\DynamicInputController')->get_list($request));
      // $data['dynamic_inputs'] = $dynamic_inputs->data->products;
      // dump($data);
      // die();
      $data['selected'] = File::find($id);
      if($data['selected']){
        if($data['selected']->editorial_permission == 'public' || $data['selected']->type_of_publicity == 'public' || $data['selected']->user_group_id == \Auth::user()->user_group_id || \Auth::user()->role_id == 1){
          $data['user_groups'] = UserGroup::orderBy('id','desc')->get();
          $data['keywords'] = Keyword::orderBy('subject','asc')->get();
          $data['editorial_permissions'] = Option::where('type','EDITORIAL_PERMISSION')->get();
          $data['file_types'] = Option::where('type','TYPE_OF_FILE')->get();
          $data['publicity_types'] = Option::where('type','TYPE_OF_PUBLICITY')->get();
          $data['is_uneditable'] = !($data['selected']->editorial_permission == 'public' || $data['selected']->user_group_id == \Auth::user()->user_group_id || \Auth::user()->role_id == 1);
          return view('pages.file-manager.edit', $data);
        }else{
          return $this->show_error_401('Berkas');
        }
      }else{
        return $this->show_error_404('Berkas');
      }
    }

    // -------------------------------------- CALLED BY AJAX ---------------------------- start
      public function get_list(Request $request)
      {
        $filter['equal_comma']  = ['keywords'];
        $filter['search'] = ['title'];
        $filter['permission'] = ['type_of_publicity'];
        return $this->get_list_common($request, 'File', $filter, ['owner_user_group']);
      }
      public function get_list_minimal(Request $request)
      {
        $filter['search'] = ['title'];
        $request->request->add(['_dir' => array('id'=>'ASC'),'_limit' => 10]); 
        return $this->get_list_common($request, 'File', $filter, ['owner_user_group']);
      }
      public function post_delete($id)
      {
          try {
            // check if ...
            $output2 = File::where('id', $id)->update(['deleted_by'    => \Auth::check()?\Auth::user()->id:null]);
            $output = File::where('id', $id)->delete();
            $output_final = array('status'=>true, 'message'=>'Berhasil menghapus data', 'data'=>$output);
          } catch (Exception $e) {
            $output_final = array('status'=>false, 'message'=>$e->getMessage(), 'data'=>null);
          }
          $this->LogRequest('Hapus '.$this->readable_name,$id,$output_final);
          return json_encode($output_final);
      }
      public function post_delete_bulk(Request $request)
      {
          try {
            $data = $request->all();
            foreach ($data['data'] as $id => $value) {   
              $output2[$id] = File::where('id', $id)->update(['deleted_by'    => \Auth::check()?\Auth::user()->id:null]);    
              $output[$id] = File::where('id', $id)->delete();
            }
            $output_final = array('status'=>true, 'message'=>'Berhasil menghapus data', 'data'=>$output);
          } catch (Exception $e) {
            $output_final = array('status'=>false, 'message'=>$e->getMessage(), 'data'=>null);
          }
          $this->LogRequest('Hapus '.$this->readable_name,$request,$output_final);
          return json_encode($output_final);
      }
      public function post_add(Request $request)
      {
          // dump($request->all());
          $validator = Validator::make($request->all(), [
            'title'  => 'required',
            'user_group_id'  => 'required',
            'type_of_file'  => 'required',
            'type_of_publicity'  => 'required',
            // 'type_of_extension'  => 'required', // setup by system
            'editorial_permission'  => 'required',
          ]); 
          if ($validator->fails()) {
            // return redirect()->back()->withInput();
            $output_final = array('status'=>false, 'message'=>$validator->messages()->first(), 'data'=>null);
          }
    
          DB::beginTransaction();
          try {
            $data = $request->all(); 
            $output = File::create(array_diff_key($data, array_flip(['dynamic_inputs','keywords'])));
            $this->file_indexes = array_merge($this->file_indexes,explode(',',$data['file_indexes2'])); unset($data['file_indexes2']);
            if(!empty($this->file_indexes)){
              foreach($this->file_indexes as $index_key => $index){ // https://laracasts.com/discuss/channels/laravel/how-direct-upload-file-in-storage-folder
                // echo "(".$index_key.")__________________________________start ";
                // dump($request->file($index));
                // echo "(".$index_key.")__________________________________end ";
                $indexes = explode('.',$index);
                if($request->file($index)){
                  // $filename_with_ext = $request->file($index)->getClientOriginalName(); // Get filename with the extension
                  // $filename = pathinfo($filename_with_ext, PATHINFO_FILENAME); // Get just filename
                  $extension = $request->file($index)->getClientOriginalExtension(); // Get just ext
                  if($index == 'file_main'){
                    $data['type_of_extension'] = $extension;
                  }
                  $filename_to_store = str_replace('/','-',$this->default_folder).$output->id.'-'.$index.'.'.$extension;
                  $path = $request->file($index)->storeAs('public/'.$this->default_folder,$filename_to_store); // Upload Image
                  if(str_contains($index,'.')){
                      $data[$indexes[0]][$indexes[1]] = '/storage//'.$this->default_folder.'/'.$filename_to_store;
                  }else{
                      $data[$index] = '/storage//'.$this->default_folder.'/'.$filename_to_store;
                  }
                }else{
                  if(str_contains($index,'.')){
                      unset($data[$indexes[0]][$indexes[1]]);
                  }else{
                      unset($data[$index]);
                  }
                }
              }
              if(isset($data['keywords'])){
                foreach ($data['keywords'] as $key => $value) {               
                  $output3[$key] = Keyword::firstOrCreate(['subject'=>$value]);
                }
                $data['keywords'] = implode(',',$data['keywords']);
              }
              if(isset($data['dynamic_inputs'])){
                $data['dynamic_inputs'] = json_encode($data['dynamic_inputs']);
              }
              // dd($data);
              $data['created_by'] = \Auth::check()?\Auth::user()->id:null;
              $output2 = File::where('id',$output->id)->update($data);
            }
            DB::commit();
            $output_final = array('status'=>true, 'message'=>'Berhasil menyimpan data', 'data'=>array('output'=>$output,'output_img'=>$output2));
          } catch (Exception $e) {
            DB::rollback();
            $output_final = array('status'=>false, 'message'=>$e->getMessage(), 'data'=>null);
          }
          $this->LogRequest('Tambah '.$this->readable_name,$request,$output_final);
          return $output_final;
      }
      public function post_edit(Request $request)
      {
          // dump($request->all());die();
          $validator = Validator::make($request->all(), [
            'title'  => 'required',
            'user_group_id'  => 'required',
            'type_of_file'  => 'required',
            'type_of_publicity'  => 'required',
            // 'type_of_extension'  => 'required', // setup by system
            'editorial_permission'  => 'required',
          ]); 
          if ($validator->fails()) {
            // return redirect()->back()->withInput();
            $output_final = array('status'=>false, 'message'=>$validator->messages()->first(), 'data'=>null);
          }
          
          DB::beginTransaction();
          try {
            $data = $request->all();
            $id = $data['id']; unset($data['id']);
            $this->file_indexes = array_merge($this->file_indexes,explode(',',$data['file_indexes2'])); unset($data['file_indexes2']);
            if(!empty($this->file_indexes)){
              foreach($this->file_indexes as $index){ // https://laracasts.com/discuss/channels/laravel/how-direct-upload-file-in-storage-folder
                $indexes = explode('.',$index);
                if($request->file($index)){
                  // $filename_with_ext = $request->file($index)->getClientOriginalName(); // Get filename with the extension
                  // $filename = pathinfo($filename_with_ext, PATHINFO_FILENAME); // Get just filename
                  $extension = $request->file($index)->getClientOriginalExtension(); // Get just ext
                  if($index == 'file_main'){
                    $data['type_of_extension'] = $extension;
                  }
                  $filename_to_store = str_replace('/','-',$this->default_folder).$id.'-'.$index.'.'.$extension;
                  $path = $request->file($index)->storeAs('public/'.$this->default_folder,$filename_to_store); // Upload Image
                  if(str_contains($index,'.')){
                      $data[$indexes[0]][$indexes[1]] = '/storage//'.$this->default_folder.'/'.$filename_to_store;
                  }else{
                      $data[$index] = '/storage//'.$this->default_folder.'/'.$filename_to_store;
                  }
                }else{
                  if(str_contains($index,'.')){
                      unset($data[$indexes[0]][$indexes[1]]);
                  }else{
                      unset($data[$index]);
                  }
                }
              }
            }
            if(isset($data['keywords'])){
              foreach ($data['keywords'] as $key => $value) {               
                $output3[$key] = Keyword::firstOrCreate(['subject'=>$value]);
              }
              $data['keywords'] = implode(',',$data['keywords']);
            }
            if(isset($data['dynamic_inputs'])){
              $data['dynamic_inputs'] = json_encode($data['dynamic_inputs']);
            }
            $data['updated_by'] = \Auth::check()?\Auth::user()->id:null;
            $output = File::where('id',$id)->update($data);
            DB::commit();
            $output_final = array('status'=>true, 'message'=>'Berhasil mengubah data', 'data'=>array('output'=>$output,'data'=>$data,'id'=>$id));
          } catch (Exception $e) {
            DB::rollback();
            $output_final = array('status'=>false, 'message'=>$e->getMessage(), 'data'=>null);
          }
          $this->LogRequest('Edit '.$this->readable_name,$request,$output_final);
          return json_encode($output_final);
      }
    // -------------------------------------- CALLED BY AJAX ---------------------------- end
}
