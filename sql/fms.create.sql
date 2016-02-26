/*==============================================================*/
/* Table: User                                                  */
/*==============================================================*/
create table User
(
   id                   integer not null auto_increment,
   userName             varchar(255) not null,
   password             varchar(255),
   nickName             varchar(255),
   employeeNo           varchar(255),
   phone                varchar(255),
   department           varchar(255),
   email                varchar(255),
   businessType         varchar(255),
   position             varchar(255),
   approvalRole         varchar(255),
   adminRole            varchar(255),
   status               varchar(255),
   createTime           datetime,
   timestamp            datetime,
   primary key (id)
)
DEFAULT CHARSET = utf8;

alter table User add index pk_user_userName (userName);
alter table User add index pk_user_nickName (nickName);

/*==============================================================*/
/* Table: Approval                                              */
/*==============================================================*/
create table Approval
(
   id                   integer not null auto_increment,
   applyId              varchar(255),
   userId               integer,
   department           varchar(255),
   timestamp            datetime,
   businessType         varchar(255),
   fileType             varchar(255),
   name                 varchar(255),
   version              varchar(255),
   formId               varchar(255),
   description          varchar(1000),
   status               varchar(255),
   viewStatus           varchar(255),
   primary key (id)
)
DEFAULT CHARSET = utf8;

alter table Approval add index pk_approval_applyId (applyId);

/*==============================================================*/
/* Table: File                                                  */
/*==============================================================*/
create table File
(
   id                   integer not null auto_increment,
   applyId              varchar(255),
   subId                integer,
   uploaderId           integer,
   category             varchar(255),
   fileName             varchar(255),
   type                 varchar(255),
   size                 varchar(255),
   url                  varchar(255),
   status               varchar(255),
   timestamp            datetime,
   primary key (id)
)
DEFAULT CHARSET = utf8;

alter table File add index pk_file_applyId (applyId);

/*==============================================================*/
/* Table: Config                                                */
/*==============================================================*/
create table Config
(
   ckey                 varchar(255),
   cvalue               varchar(255),
   primary key (ckey)
)
DEFAULT CHARSET = utf8;

/*==============================================================*/
/* Table: Reviewer                                              */
/*==============================================================*/
create table Reviewer
(
   id                   integer not null auto_increment,
   applyId              varchar(255),
   userName             varchar(255),
   approvalRole         varchar(255),
   status               varchar(255),
   comments             varchar(1000),
   conclusion           varchar(255),
   timestamp            datetime,
   primary key (id)
)
DEFAULT CHARSET = utf8;

/*==============================================================*/
/* Table: Auth                                                  */
/*==============================================================*/
create table Auth
(
   id                   integer not null auto_increment,
   applyId              varchar(255),
   userName             varchar(255),
   authRole             varchar(255),
   timestamp            datetime,
   primary key (id)
)
DEFAULT CHARSET = utf8;

insert into Config values('ZW_HOME', 'D:\\huazhi\\work\\fms');
insert into Config values('fileTypes', 'accdb, chm, doc, docx, exe, htm, html, mdb, pdf, ppt, pptx, rar, txt, xls, xlsx, zip');
insert into Config values('businessTypes', '销售管理, 生产管理, 技术管理, 实验室管理, 采购管理, 人事管理, 计划物控管理, 财务管理, 工艺管理, 设备管理, 品质管理');

insert into User values (null, 'admin', 'ICy5YqxZB1uWSwcVLSNLcA==', '管理员', '管理员工号1', '13612345678', '管理部门', 'admin@company.com', '管理', '职员', '一级审批,二级审批,三级审批,四级审批', '基本账号管理,文件查询权限管理,文件有效性管理', '正常', now(), now()); /* password 123 */

insert into User values (null, 'sales1', 'ICy5YqxZB1uWSwcVLSNLcA==', '销售拟稿人1', '销售拟稿人1的工号', '13612345678', '销售部门', 'sales1@company.com', '销售管理', '职员', '', '', '正常', now(), now()); /* password 123 */
insert into User values (null, 'sales2', 'ICy5YqxZB1uWSwcVLSNLcA==', '销售拟稿人2', '销售拟稿人2的工号', '13612345678', '销售部门', 'sales2@company.com', '销售管理', '职员', '', '', '正常', now(), now()); /* password 123 */
insert into User values (null, 'salesreviewer1', 'ICy5YqxZB1uWSwcVLSNLcA==', '销售审批员1', '销售审批员1的工号', '13612345678', '销售部门', 'salesreviewer1@company.com', '销售管理', '职员', '一级审批', '', '正常', now(), now()); /* password 123 */
insert into User values (null, 'salesreviewer2', 'ICy5YqxZB1uWSwcVLSNLcA==', '销售审批员2', '销售审批员2的工号', '13612345678', '销售部门', 'salesreviewer2@company.com', '销售管理', '职员', '一级审批', '', '正常', now(), now()); /* password 123 */
insert into User values (null, 'salesdirector1', 'ICy5YqxZB1uWSwcVLSNLcA==', '销售主管1', '销售主管1的工号', '13612345678', '销售部门', 'salesdirector@company.com', '销售管理', '主管', '二级审批', '基本账号管理', '正常', now(), now()); /* password 123 */
insert into User values (null, 'salesdirector2', 'ICy5YqxZB1uWSwcVLSNLcA==', '销售主管2', '销售主管2的工号', '13612345678', '销售部门', 'salesdirector2@company.com', '销售管理', '主管', '二级审批', '基本账号管理', '正常', now(), now()); /* password 123 */
insert into User values (null, 'production1', 'ICy5YqxZB1uWSwcVLSNLcA==', '生产拟稿人1', '生产拟稿人1的工号', '13612345678', '生产部门', 'production1@company.com', '生产管理', '职员', '', '', '正常', now(), now()); /* password 123 */
insert into User values (null, 'production2', 'ICy5YqxZB1uWSwcVLSNLcA==', '生产拟稿人2', '生产拟稿人2的工号', '13612345678', '生产部门', 'production2@company.com', '生产管理', '职员', '', '', '正常', now(), now()); /* password 123 */
insert into User values (null, 'productionreviewer1', 'ICy5YqxZB1uWSwcVLSNLcA==', '生产审批员1', '生产审批员1的工号', '13612345678', '生产部门', 'productionreviewer1@company.com', '生产管理', '职员', '一级审批', '', '正常', now(), now()); /* password 123 */
insert into User values (null, 'productionreviewer2', 'ICy5YqxZB1uWSwcVLSNLcA==', '生产审批员2', '生产审批员2的工号', '13612345678', '生产部门', 'productionreviewer2@company.com', '生产管理', '职员', '一级审批', '', '正常', now(), now()); /* password 123 */
insert into User values (null, 'productiondirector1', 'ICy5YqxZB1uWSwcVLSNLcA==', '生产主管1', '生产主管1的工号', '13612345678', '生产部门', 'productiondirector@company.com', '生产管理', '主管', '二级审批', '基本账号管理', '正常', now(), now()); /* password 123 */
insert into User values (null, 'productiondirector2', 'ICy5YqxZB1uWSwcVLSNLcA==', '生产主管2', '生产主管2的工号', '13612345678', '生产部门', 'productiondirector2@company.com', '生产管理', '主管', '二级审批', '基本账号管理', '正常', now(), now()); /* password 123 */
insert into User values (null, 'manager', 'ICy5YqxZB1uWSwcVLSNLcA==', '经理', '经理的工号', '13612345678', '公司部门', 'manager@company.com', '公司管理', '经理', '三级审批', '基本账号管理,文件查询权限管理,文件有效性管理', '正常', now(), now()); /* password 123 */
insert into User values (null, 'generalmanager', 'ICy5YqxZB1uWSwcVLSNLcA==', '总经理', '总经理的工号', '13612345678', '公司部门', 'generalmanager@company.com', '公司管理', '总经理', '四级审批', '基本账号管理,文件查询权限管理,文件有效性管理', '正常', now(), now()); /* password 123 */

commit;
