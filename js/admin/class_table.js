  class Table{              
    constructor(nameTable){
        this.Name=nameTable;
        this.Lines_one_page=50;
        this.Page=1;

        this.count_lines=0;
        this.pages=0;
        this.create();
    }

    create(){
        var data={
            create:         true, 
            name:           this.Name,
            lines_one_page: this.Lines_one_page, 
            page:           this.Page
        }
        var lines=0,pages=0;
        $.ajax({
            type: "POST",
            url: "ajax/admin/for_admin.php",
            cache: false,
           async: false,
            data: data,
            success: function(data_) {                   
                data_=JSON.parse(data_);
                lines =Number(data_.count_lines);
                pages =Number(data_.pages); 
            }
        });
       this.count_lines=lines;
       this.pages=pages;  
        //отобразить
        var dataaa={show: true}
        this.ajax(dataaa);
        this.updataNumberPage(this.Page);
        $("#max_str").text(this.count_lines);
        $("#max_pag").text(this.pages);
    }              
    setPage_and_Show(page){
        if(page>0 & page<=this.pages){
        this.Page=page;                   
        var data={setPage_and_Show: true,page: this.Page}
        this.ajax(data); 
        this.updataNumberPage(page);
        }
    }


    ajax(data){
        $.ajax({
            type: "POST",
            url: "ajax/admin/for_admin.php",
            cache: false,
            data: data,
            success: function(html) {                   
                $("#content").html(html);                           
            }
        });
    }  
    updataNumberPage(page){  
        var count=5;
        if(this.pages<count){
            count=this.pages;
        }
        var name='#num_page';
        for(var i=1;i<=count;i++){
              $(name+i).show();
        }                    
        if(count<5)
        for(var i=5;i>count;i--){
            $(name+i).hide();
        }



        if(count>=5){
                if(page<=2 & page>0){
                    for(var i=1;i<=count;i++){
                     $(name+i).text(i);
                    } 
                }                  
                if(page>2 & page<(this.pages-1)){                        
                    $("#num_page1").text(page-2);
                    $("#num_page2").text(page-1);
                    $("#num_page3").text(page);
                    $("#num_page4").text(page+1);
                    $("#num_page5").text(page+2);
                }  
                if( page==this.pages){                       
                    $("#num_page1").text(page-4);
                    $("#num_page2").text(page-3);
                    $("#num_page3").text(page-2);
                    $("#num_page4").text(page-1);
                    $("#num_page5").text(page);
                }
         }
        if(page>0 & page<=this.pages)
        for(var i=1;i<=count;i++){
            if($(name+i).text()==page){
                $(name+i).addClass("active");
            }
            else {
                 $(name+i).removeClass("active");
                 $(name+i).blur();
            }
        }
    }                
    updata(){
        var data={updata: true}
        var lines=0,pages=0;
            $.ajax({
            type: "POST",
            url: "ajax/admin/for_admin.php",
            cache: false,
            async: false,
            data: data,
            success: function(html) {                            
                html = JSON.parse(html);  
                lines =Number(html.count_lines);
                pages =Number(html.pages);                             
            }
        });
        this.count_lines=lines;
        this.pages=pages;  
    }
  }