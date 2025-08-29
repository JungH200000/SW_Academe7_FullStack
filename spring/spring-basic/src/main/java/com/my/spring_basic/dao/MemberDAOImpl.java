package com.my.spring_basic.dao;

import com.my.spring_basic.domain.MemberDTO;
import org.springframework.stereotype.Repository;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

@Repository
public class MemberDAOImpl implements MemberDAO{

    private Connection con;
    private PreparedStatement ps;
    private ResultSet rs;
    private String url="jdbc:mysql://localhost:3306/kbdb?useUnicode=true&serverTimezone=Asia/Seoul";
    private String user="master";//root
    private String pwd="tiger";//1234

    public MemberDAOImpl(){
        try{
            //JDBC Driver Loading
            Class.forName("com.mysql.cj.jdbc.Driver");
            System.out.println("드라이버 로딩 성공...");
        }catch(Exception e){
            e.printStackTrace();
        }
    }

    public Connection getConnection() throws SQLException {
        Connection con= DriverManager.getConnection(url,user,pwd);
        return con;
    }

    @Override
    public int createMember(MemberDTO user) {
        try{
            con=getConnection();
            System.out.println("DB연결됨");
            String sql="insert into members(name,email,passwd,role) values(?,?,?,?)";
            ps = con.prepareStatement(sql);
            ps.setString(1, user.getName());
            ps.setString(2,user.getEmail());
            ps.setString(3, user.getPasswd());
            ps.setString(4, user.getRole());
            //sql문 전송
            //insert,delete,update ==> ps.executeUpdate()
            //select문 ==> ps.executeQuery()
            int row = ps.executeUpdate();
            return row;
        }catch (SQLException e){
            e.printStackTrace();
            return -1;
        } finally {
            close();
        }
    }

    public void close(){
        try {
            if(rs!=null) rs.close();
            if(ps!=null) ps.close();
            if (con != null) con.close();
        }catch(Exception ex){}
    }

    @Override
    public List<MemberDTO> listMember() {
        try{
            con=getConnection();
            String sql="select * from members order by id desc";
            ps=con.prepareStatement(sql);
            //select문: ResultSet executeQuery()
            rs=ps.executeQuery();
            List<MemberDTO> arrList=new ArrayList<>();
            while(rs.next()){
                int id =rs.getInt("id");
                String name=rs.getString("name");
                String email=rs.getString("email");
                String role = rs.getString("role");
                Date createdAt=rs.getDate("createdAt");
                MemberDTO user=new MemberDTO(id, name,email,null,role,createdAt);
                arrList.add(user);
            }
            return arrList;
        }catch (SQLException e){
            e.printStackTrace();
            return null;
        }finally {
            close();
        }
    }

    @Override
    public Integer checkEmail(String email) throws SQLException {
        try {
            con =getConnection();
            String sql="select id from members where email=?";
            ps=con.prepareStatement(sql);
            ps.setString(1,email);
            rs=ps.executeQuery();
            boolean exists=rs.next();
            if(!exists) return null;
            int id =rs.getInt("id");
            return Integer.valueOf(id);
        }finally {
            close();
        }
    }
}
